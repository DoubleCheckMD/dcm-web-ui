# DCM Web UI

A modern React application built with Vite for DoubleCheckMD. Features include user authentication, file upload, AI-powered document analysis, and more.

## 🚀 Quick Start

### Prerequisites

- Node.js (v22 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/DoubleCheckMD/dcm-web-ui.git
cd dcm-web-ui
```

2. Install dependencies:
```sh
npm install
```

## 🎮 Running the Application

### 🎭 Mock Mode (No Backend Required!)

Perfect for testing, demos, and frontend development:

```sh
npm run mock
```

**Test Login:**
- Email: `test@example.com`
- Password: `password123`

See [MOCK_MODE.md](MOCK_MODE.md) for details.

### 🌐 With Backend

```sh
npm run local      # Local backend (http://localhost:3000)
npm run dev        # Development server
npm run sandbox    # Sandbox environment
npm run prod       # Production environment
```

## 📦 Building for Production

```sh
npm run build
```

The built files will be in the `dist` directory.

## 🧪 Development

```sh
npm run lint       # Run ESLint
npm run preview    # Preview production build
```

## ✨ Features

- 🔐 User Authentication (Login, Register, Password Reset)
- 📁 File Upload with Preview
- 🤖 AI-Powered Document Q&A
- 👤 User Profile Management
- 🎨 Modern UI with Tailwind CSS
- 📱 Fully Responsive Design
- 🎭 Mock Mode for Backend-Free Testing

## 📚 Documentation

- [Quick Reference](QUICK_REFERENCE.md) - Common patterns and usage
- [Mock Mode Guide](MOCK_MODE.md) - Testing without backend
- [API Services](src/services/README.md) - Service layer documentation
- [Migration Guide](API_SERVICE_MIGRATION.md) - Service layer details

## 🛠️ Tech Stack

- **React 18** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP Client
- **React Router** - Navigation
- **React PDF** - PDF Viewing

## 📁 Project Structure

```
dcm-web-ui/
├── src/
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── services/       # API service layer
│   │   ├── mock/       # Mock services for testing
│   │   ├── authService.js
│   │   ├── uploadService.js
│   │   └── aiService.js
│   └── utils/          # Utility functions
├── public/             # Static assets
└── dist/              # Production build
```

## 🔧 Configuration

- **ESLint**: `eslint.config.js`
- **Tailwind CSS**: `tailwind.config.js`
- **Vite**: `vite.config.js`
- **PostCSS**: `postcss.config.js`

## 🌍 Environment Configuration

Environment is set via npm scripts (no .env files):

| Script | Environment | API URL |
|--------|-------------|---------|
| `npm run mock` | Mock (No API) | N/A |
| `npm run local` | Local | http://localhost:3000 |
| `npm run dev` | Development | https://dev-api.doublecheckmd.com |
| `npm run sandbox` | Sandbox | https://sandbox-api.doublecheckmd.com |
| `npm run prod` | Production | https://api.doublecheckmd.com |

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test with mock mode: `npm run mock`
4. Test with local backend: `npm run local`
5. Run linter: `npm run lint`
6. Submit a pull request

## 📄 License

This project is proprietary software owned by DoubleCheckMD.

## 🆘 Support

For issues and questions, please contact the development team.

Vite
The project uses Vite as the build tool. The configuration is in vite.config.js.


