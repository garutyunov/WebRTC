# Video Messenger

A secure video calling application built with React, TypeScript, Vite, and PeerJS. Features password protection and peer-to-peer video/audio communication.

## Features

- 🔒 **Password Protection**: Hardcoded password security (password: `1234`)
- 📹 **Video Calling**: Peer-to-peer video and audio communication
- 🎨 **Modern UI**: SCSS modules styling with responsive design
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🚀 **Fast Deployment**: Easy deployment to GitHub Pages

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **PeerJS** for WebRTC peer-to-peer communication
- **SCSS** with CSS modules for component styling
- **GitHub Pages** for deployment

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd messenger
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Login**: Enter the password `1234` to access the application
2. **Setup**: Enter your name and the name of the person you want to call
3. **Connect**: Click "Save & Connect" to proceed to the video calling interface
4. **Start Call**: Click "Start Call" to initiate the video call

## Deployment to GitHub Pages

1. Update the `homepage` field in `package.json` with your GitHub Pages URL:
   ```json
   "homepage": "https://yourusername.github.io/messenger"
   ```

2. Build and deploy:
   ```bash
   npm run deploy
   ```

The application will be deployed to your GitHub Pages site.

## How PeerJS Connection Works

The application uses PeerJS for establishing peer-to-peer connections:

1. Each user gets a unique peer ID when they start the application
2. Users need to share their peer IDs to establish connections
3. The video/audio streams are transmitted directly between peers (no server required)
4. Connection is established through WebRTC technology

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages

### Project Structure

```
src/
├── App.tsx                      # Main application component
├── LoginForm.tsx                # Password protection component
├── LoginForm.module.scss        # Styles for LoginForm
├── MessengerApp.tsx             # Main messenger interface
├── MessengerApp.module.scss     # Styles for MessengerApp
├── VideoCall.tsx                # Video calling functionality
├── VideoCall.module.scss        # Styles for VideoCall
├── main.tsx                     # Application entry point
├── index.css                    # Global styles
└── vite-env.d.ts                # Vite type definitions
```

## Security Note

This application uses a hardcoded password for demonstration purposes. In a production environment, you should implement proper authentication and authorization mechanisms.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
