# Отладка видеозвонков

## Как тестировать подключение:

### Шаг 1: Откройте две вкладки браузера
1. Откройте приложение в первой вкладке
2. Войдите с именем "Alice" 
3. Нажмите "Start Messenger"
4. Введите имя собеседника "Bob"
5. Нажмите "Start Video Call"

### Шаг 2: Откройте вторую вкладку
1. Откройте приложение во второй вкладке  
2. Войдите с именем "Bob"
3. Нажмите "Start Messenger" 
4. Введите имя собеседника "Alice"
5. Нажмите "Start Video Call"

### Шаг 3: Соединение
1. В первой вкладке (Alice) вы увидите Peer ID: `alice-user`
2. Во второй вкладке (Bob) вы увидите Peer ID: `bob-user`
3. В поле "Enter Bob's Peer ID" введите: `bob-user`
4. В поле "Enter Alice's Peer ID" введите: `alice-user`
5. Нажмите "Start Call" в одной из вкладок

## Диагностика проблем:

### Откройте Developer Tools (F12) и посмотрите консоль:

**Нормальные логи при запуске:**
```
🔵 Initializing peer with ID: alice-user
✅ My peer ID is: alice-user  
✅ Peer is ready to make/receive calls
```

**Логи при клике Start Call:**
```
🔵 Start call clicked!
🔵 Peer: [PeerJS object]
🔵 Target Name: Bob
🔵 Target Peer ID: bob-user
🔵 Setting calling to true...
🔵 Requesting media access...
✅ Got media stream
✅ Set local video stream
🔵 Calling peer: bob-user
✅ Call initiated
```

**При успешном соединении:**
```
✅ Received remote stream
```

### Возможные ошибки:

1. **"Missing peer or target name"** - Peer не инициализирован
2. **"Please enter Bob's Peer ID first"** - Не введен Peer ID собеседника  
3. **MediaDevices error** - Нет доступа к камере/микрофону
4. **Call error: peer-unavailable** - Собеседник не онлайн или неправильный ID

### Разрешения браузера:
- Убедитесь что разрешен доступ к камере и микрофону
- Проверьте что нет блокировки всплывающих окон
- Используйте HTTPS или localhost для доступа к медиа

### Тестирование без второго пользователя:
Можно ввести несуществующий Peer ID чтобы проверить что происходит ошибка "peer-unavailable".
