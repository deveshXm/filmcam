# Micro SaaS Template

A modern, production-ready template for building micro SaaS applications using React, Express, TypeScript, and MongoDB.

## 🚀 Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite (build tool)
- Tailwind CSS
- Axios (API client)

**Backend:**
- Express.js with TypeScript
- MongoDB with Mongoose
- Google OAuth 2.0 authentication
- Express Session

**DevOps:**
- GitHub Actions CI/CD
- Docker support (coming soon)
- Digital Ocean deployment ready

## 📁 Project Structure

```
/
├── src/                    # React frontend source
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── services/          # API calls
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main App component
│   └── main.tsx           # Entry point
├── server/                # Express backend
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # Route definitions
│   │   ├── middleware/    # Express middleware
│   │   ├── config/        # Database and auth config
│   │   ├── utils/         # Backend utilities
│   │   ├── app.ts         # Express app setup
│   │   └── server.ts      # Server entry point
│   └── package.json       # Backend dependencies
├── types/
│   └── index.ts           # Shared TypeScript types
├── .github/workflows/     # GitHub Actions
└── package.json           # Frontend dependencies
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 20+ 
- MongoDB Atlas account (or local MongoDB)
- Google Cloud Console project for OAuth

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd your-project-name

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Environment Configuration

**Frontend Environment (.env):**
```bash
cp env.example .env
```

**Backend Environment (server/.env):**
```bash
cp server/env.example server/.env
```

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3001/api/auth/google/callback`
5. Copy Client ID and Client Secret to `server/.env`

### 4. MongoDB Setup

1. Create a MongoDB Atlas cluster
2. Get your connection string
3. Add it to `server/.env` as `MONGODB_URI`

### 5. Session Secret

Generate a secure session secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Add it to `server/.env` as `SESSION_SECRET`

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd server
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend will be available at `http://localhost:3001`

### Production Build

**Frontend:**
```bash
npm run build
npm run preview
```

**Backend:**
```bash
cd server
npm run build
npm start
```

## 📝 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript
- `npm start` - Start production server

## 🔒 Authentication Flow

1. User clicks "Continue with Google"
2. Redirected to Google OAuth consent screen
3. After approval, redirected back to app
4. User profile stored in MongoDB
5. Session created and user logged in
6. Protected routes accessible

## 🏗️ Adding New Features

### Frontend Components
Create new components in `src/components/`:
```typescript
// src/components/MyComponent.tsx
export const MyComponent = (): JSX.Element => {
  return <div>My Component</div>;
};
```

### Backend Routes
1. Create controller in `server/src/controllers/`
2. Create route in `server/src/routes/`
3. Register route in `server/src/app.ts`

### Database Models
Create new models in `server/src/models/`:
```typescript
// server/src/models/MyModel.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IMyModel extends Document {
  name: string;
}

const MyModelSchema = new Schema<IMyModel>({
  name: { type: String, required: true },
}, { timestamps: true });

export const MyModel = mongoose.model<IMyModel>('MyModel', MyModelSchema);
```

## 🚀 Deployment

### Digital Ocean Droplet (Coming Soon)
Deployment scripts and instructions for Digital Ocean will be added soon.

### GitHub Actions
The project includes a CI/CD pipeline that:
- Runs tests on frontend and backend
- Builds both applications
- Deploys on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you have any questions or need help, please open an issue on GitHub.