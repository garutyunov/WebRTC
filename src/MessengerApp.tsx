import React, { useState, useEffect } from 'react';
import VideoCall from './VideoCall';
import styles from './MessengerApp.module.scss';

const MessengerApp: React.FC = () => {
  const [roomId, setRoomId] = useState('');
  const [isInRoom, setIsInRoom] = useState(false);
  const [joinRoomId, setJoinRoomId] = useState('');
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    // Получаем roomId из URL если есть
    const urlPath = window.location.pathname;
    const urlRoomId = urlPath.split('/').pop();
    
    if (urlRoomId && urlRoomId !== '' && urlRoomId !== 'messenger') {
      setRoomId(urlRoomId);
      setJoinRoomId(urlRoomId);
      setIsInRoom(true);
      setIsCreator(false); // Если зашли по ссылке, то мы присоединяемся
    }
  }, []);

  const createRoom = () => {
    // Генерируем Peer ID который будет одновременно roomId
    const newPeerId = `room-${Math.random().toString(36).substr(2, 9)}`;
    setRoomId(newPeerId);
    setIsInRoom(true);
    setIsCreator(true); // Устанавливаем что мы создатель
    
    // Обновляем URL без перезагрузки страницы
    window.history.pushState({}, '', `/${newPeerId}`);
  };

  const joinRoom = () => {
    if (joinRoomId.trim()) {
      setRoomId(joinRoomId.trim());
      setIsInRoom(true);
      setIsCreator(false); // Устанавливаем что мы присоединяемся
      
      // Обновляем URL без перезагрузки страницы
      window.history.pushState({}, '', `/${joinRoomId.trim()}`);
    }
  };

  const handleBack = () => {
    setIsInRoom(false);
    setRoomId('');
    setJoinRoomId('');
    setIsCreator(false); // Сбрасываем статус создателя
    
    // Возвращаемся на главную страницу
    window.history.pushState({}, '', '/');
  };

  if (isInRoom) {
    return (
      <div className={styles['app-container']}>
        <header className={styles.header}>
          <button className={styles['back-button']} onClick={handleBack}>Выйти из комнаты</button>
        </header>
        <VideoCall roomId={roomId} isCreator={isCreator} />
      </div>
    );
  }

  return (
    <div className={styles['app-container']}>
      <header className={styles.header}>
        <p className={styles.subtitle}>Создайте комнату или присоединитесь к существующей</p>
      </header>
      
      <div className={styles['setup-container']}>
        <div className={styles['room-actions']}>
          <div className={styles['action-card']}>
            <h3>Создать новую комнату</h3>
            <p>Создайте комнату и пригласите друзей по ссылке</p>
            <button 
              className={`${styles.button} ${styles.primary}`}
              onClick={createRoom}
            >
              🏠 Создать комнату
            </button>
          </div>

          <div className={styles.divider}>или</div>

          <div className={styles['action-card']}>
            <h3>Присоединиться к комнате</h3>
            <p>Введите ID комнаты или воспользуйтесь полученной ссылкой</p>
            
            <div className={styles['form-group']}>
              <label className={styles.label} htmlFor="roomId">ID комнаты</label>
              <input
                className={styles.input}
                id="roomId"
                type="text"
                placeholder="Введите ID комнаты (например: abc123xy)"
                value={joinRoomId}
                onChange={(e) => setJoinRoomId(e.target.value)}
              />
            </div>
            
            <button 
              className={`${styles.button} ${styles.secondary}`}
              onClick={joinRoom}
              disabled={!joinRoomId.trim()}
            >
              🚪 Присоединиться
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessengerApp;
