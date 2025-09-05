import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import CopyButton from './components/CopyButton';
import styles from './VideoCall.module.scss';

interface VideoCallProps {
  roomId: string;
  isCreator?: boolean; // Новый пропс для указания что пользователь создатель
}

const VideoCall: React.FC<VideoCallProps> = ({ roomId, isCreator = false }) => {
  const [peer, setPeer] = useState<Peer | null>(null);
  const [myPeerId, setMyPeerId] = useState<string>('');
  const [targetPeerId, setTargetPeerId] = useState<string>('');
  const [connected, setConnected] = useState(false);
  const [calling, setCalling] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [incomingCall, setIncomingCall] = useState<any>(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isSecondUser, setIsSecondUser] = useState(false);
  
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const myStreamRef = useRef<MediaStream | null>(null);
  const callRef = useRef<any>(null);

  useEffect(() => {
    // Проверяем, есть ли в URL параметр peerId (значит мы присоединяемся к комнате)
    const urlParams = new URLSearchParams(window.location.search);
    const targetPeerIdFromUrl = urlParams.get('peerId');
    
    let userPeerId: string;
    
    if (isCreator) {
      // Мы создатель комнаты - используем roomId как наш Peer ID
      userPeerId = roomId;
      console.log('🏠 Creating room, using roomId as Peer ID:', userPeerId);
      setIsSecondUser(false);
    } else if (targetPeerIdFromUrl) {
      // Мы присоединяемся к комнате через полную ссылку с peerId - создаем новый ID для себя
      userPeerId = `${roomId}-user-${Math.random().toString(36).substr(2, 6)}`;
      setIsSecondUser(true);
      
      // Автоматически заполняем поле для подключения к создателю комнаты
      setTargetPeerId(targetPeerIdFromUrl);
    } else {
      // Мы присоединяемся к комнате через ссылку, но без peerId - значит это второй пользователь
      userPeerId = `${roomId}-user-${Math.random().toString(36).substr(2, 6)}`;
      setIsSecondUser(true);
      
    }
    
    const newPeer = new Peer(userPeerId);
    setPeer(newPeer);

    newPeer.on('open', (id) => {
      setMyPeerId(id);
      console.log('✅ My peer ID is:', id);
      
      // Если мы второй пользователь и еще не знаем ID создателя, попробуем найти его
      if (!isCreator && !targetPeerIdFromUrl) {
        console.log('🔍 Looking for room creator with ID:', roomId);
        // Пробуем подключиться к создателю комнаты (его ID = roomId)
        setTimeout(() => {
          setTargetPeerId(roomId);
          console.log('🎯 Set target peer ID to room creator:', roomId);
        }, 1000); // Небольшая задержка чтобы дать время создателю стать готовым
      }
    });

    newPeer.on('call', (call) => {
      console.log('📞 Incoming call from:', call.peer);
      setIncomingCall(call);
      setReceivingCall(true);
    });

    return () => {
      newPeer.destroy();
    };
  }, [roomId, isCreator]);

  const acceptCall = async () => {
    if (!incomingCall) return;
    
    console.log('✅ Accepting incoming call');
    setReceivingCall(false);
    
    try {
      // Сначала пробуем получить видео + аудио
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        console.log('✅ Got video + audio stream for answer');
      } catch {
        // Если видео не получилось, пробуем только аудио
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
        } catch (audioError) {
          console.error('❌ Failed to get any media for answer:', audioError);
          setReceivingCall(false);
          setIncomingCall(null);
          return;
        }
      }
      
      myStreamRef.current = stream;
      
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }
      
      incomingCall.answer(stream);
      callRef.current = incomingCall;
      setInCall(true);
      
      incomingCall.on('stream', (remoteStream: MediaStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
        setConnected(true);
      });
      
      incomingCall.on('close', () => {
        endCall();
      });
      
      setIncomingCall(null);
    } catch (err) {
      console.error('❌ Failed to accept call:', err);
      setReceivingCall(false);
      setIncomingCall(null);
    }
  };

  const rejectCall = () => {
    if (incomingCall) {
      incomingCall.close();
    }
    setIncomingCall(null);
    setReceivingCall(false);
  };

  const makeCall = async () => {
    if (!peer || !myStreamRef.current || !targetPeerId.trim() || inCall) return;
    
    setCalling(true);
    
    try {
      const call = peer.call(targetPeerId.trim(), myStreamRef.current);
      callRef.current = call;
      
      call.on('stream', (remoteStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
        setConnected(true);
        setInCall(true);
        setCalling(false);
      });
      
      call.on('error', (err) => {
        console.error('❌ Call failed:', err);
        setCalling(false);
      });
      
      call.on('close', () => {
        endCall();
      });
      
    } catch (err) {
      setCalling(false);
    }
  };

  const startCall = async () => {
    if (!peer) return;
    
    setCalling(true);
    
    try {
      // Сначала пробуем получить видео + аудио
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      } catch  {
        // Если видео не получилось, пробуем только аудио
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
        } catch {
          setCalling(false);
          return;
        }
      }
      
      myStreamRef.current = stream;
      
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }
      
      setIsReady(true);
      setCalling(false);
      
    } catch (err) {
      setCalling(false);
    }
  };

  const endCall = () => {
    
    if (callRef.current) {
      callRef.current.close();
      callRef.current = null;
    }
    
    if (myStreamRef.current) {
      myStreamRef.current.getTracks().forEach(track => track.stop());
      myStreamRef.current = null;
    }
    
    if (myVideoRef.current) {
      myVideoRef.current.srcObject = null;
    }
    
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
    
    setConnected(false);
    setInCall(false);
    setCalling(false);
    setIsReady(false);
    setReceivingCall(false);
    setIncomingCall(null);
  };

  // Обновляем URL когда пользователь готов к звонку (только для создателя комнаты)
  useEffect(() => {
    if (myPeerId && isReady && isCreator) {
      // Только создатель комнаты обновляет URL со своим Peer ID
      const currentUrl = window.location.origin + window.location.pathname;
      const newUrl = `${currentUrl}?peerId=${myPeerId}`;
      window.history.replaceState({}, '', newUrl);
    }
  }, [myPeerId, isReady, isCreator]);

  return (
    <>
      {receivingCall && (
        <div className={styles['incoming-call-overlay']}>
          <div className={styles['incoming-call-modal']}>
            <h3>📞 Входящий звонок</h3>
            <p>Звонит: <strong>{incomingCall?.peer || 'Неизвестный'}</strong></p>
            <div className={styles['incoming-call-buttons']}>
              <button 
                className={`${styles['control-button']} ${styles.accept}`}
                onClick={acceptCall}
              >
                Принять
              </button>
              <button 
                className={`${styles['control-button']} ${styles.danger}`}
                onClick={rejectCall}
              >
                Отклонить
              </button>
            </div>
          </div>
        </div>
      )}


  
      <div className={styles['top-panel']}>
        <div className={styles['panel-left']}>
          <span className={styles['room-id']}>Твой ID: {myPeerId}</span>
          <div className={styles['status-section']}>
            <span className={`${styles['status-dot']} ${connected ? styles.connected : styles.disconnected}`} />
            <span className={styles['status-text']}>
              {connected ? 'Подключен' : 
                receivingCall ? 'Звонок...' :
                calling ? 'Соединение...' : 'Готов'}
            </span>
          </div>
        </div>
        
        <div className={styles['panel-center']}>
          {isReady && !inCall && (
            <div className={styles['call-section']}>
              <input
                type="text"
                value={targetPeerId}
                onChange={(e) => setTargetPeerId(e.target.value)}
                placeholder="ID собеседника"
                className={styles['target-input']}
              />
              <button 
                className={styles['call-button']}
                onClick={makeCall}
                disabled={!targetPeerId.trim() || calling}
              >
                {calling ? '📞' : '📞'}
              </button>
            </div>
          )}
          {myPeerId && (
            <div className={styles['quick-actions']}>
              <CopyButton
                text={myPeerId}
                buttonText="Копировать ID"
                copiedText="Скопированно"
                copyKey="peer-id"
                size="small"
              />
            </div>
          )}
        </div>

        <div className={styles['panel-right']}>
          {inCall && (
            <button 
              className={`${styles['exit-button']}`}
              onClick={endCall}
              title="Завершить звонок"
            >
              📞❌
            </button>
          )}
        </div>
        {!inCall && !isReady && (
          <>
            <span>
              {targetPeerId ? `Подключиться к: ${targetPeerId}` :
              isSecondUser ? 'Введите ID создателя комнаты выше' :
              'Нажмите "Подготовить камеру" и поделитесь ссылкой'}
            </span>
            <button 
              className={styles['control-button']}
              onClick={startCall}
              disabled={!myPeerId}
              >
              {!isSecondUser ? 'Поднять соединение' : 'Присоединиться'}
            </button>
          </>
        )}
      </div>

      <div className={styles['video-container']}>
        <div className={styles['video-wrapper']}>
          <video
            ref={myVideoRef}
            autoPlay
            muted
            playsInline
            className={styles.video}
          />
          <div className={styles['video-label']}>Вы</div>
        </div>
        
        <div className={styles['video-wrapper']}>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className={styles.video}
          />
          <div className={styles['video-label']}>Собеседник</div>
        </div>
      </div>

    </>
  );
};

export default VideoCall;
