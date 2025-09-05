# Setup Instructions for Video Messenger

## Quick Start

Your Video Messenger application is ready! Here's what you have:

### 🎯 What's Built
- ✅ Password-protected React application (password: `1234`)
- ✅ PeerJS video/audio calling functionality
- ✅ CSS-in-JS styling with styled-components
- ✅ GitHub Pages deployment ready
- ✅ Development server running at: http://localhost:5174/

### 🚀 How to Use the Application

1. **Access the App**: Open http://localhost:5174/ in your browser
2. **Login**: Enter password `1234` to access the main interface
3. **Setup Call**: 
   - Enter your name in the first field
   - Enter the name of the person you want to call
   - Click "Save & Connect"
4. **Video Calling**: Click "Start Call" to initiate video/audio connection

### 📤 Deploy to GitHub Pages

1. **Create GitHub Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/messenger.git
   git push -u origin main
   ```

2. **Update package.json**: 
   - Change `"homepage": "https://yourusername.github.io/messenger"` to your actual GitHub username

3. **Deploy**:
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages**: 
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose `gh-pages` branch
   - Your site will be available at: `https://yourusername.github.io/messenger`

### 🔧 Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to GitHub Pages

### 💡 How PeerJS Connection Works

The application creates peer-to-peer connections between users:
1. Each user gets a unique peer ID
2. Users need to coordinate their peer IDs to establish connections
3. For this demo, the app generates IDs based on the target name
4. In real usage, users would share their actual peer IDs

### 🔒 Security Notes

- The hardcoded password (`1234`) is for demonstration only
- For production use, implement proper authentication
- PeerJS connections are peer-to-peer (no backend required)
- Video/audio streams are transmitted directly between browsers

### 🎨 Customization

The app uses SCSS modules for styling. You can customize:
- Colors and themes in SCSS module files
- Layout and responsive design in component SCSS files
- Add new features like text chat
- Implement user authentication

### 🐛 Troubleshooting

**Connection Issues**:
- Ensure both users are on the same network or use STUN/TURN servers
- Check browser permissions for camera/microphone
- Try refreshing the page if connection fails

**Build Issues**:
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (requires 18+)

### 📁 Project Structure

```
src/
├── App.tsx                      # Main app with login state
├── LoginForm.tsx                # Password protection screen
├── LoginForm.module.scss        # LoginForm styles
├── MessengerApp.tsx             # Name setup and main interface
├── MessengerApp.module.scss     # MessengerApp styles
├── VideoCall.tsx                # PeerJS video calling logic
├── VideoCall.module.scss        # VideoCall styles
├── main.tsx                     # React entry point
└── index.css                    # Global styles
```

### 🎮 Next Steps

1. Test the application locally
2. Customize the design to your liking
3. Deploy to GitHub Pages
4. Share the URL with friends to test video calling
5. Consider adding features like:
   - Text chat
   - Screen sharing
   - Multiple participants
   - Better user authentication

Happy coding! 🚀
