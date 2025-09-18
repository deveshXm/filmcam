#!/bin/bash

# AI Photo Editor Deployment Script for Digital Ocean
# This script builds the frontend and backend, then restarts PM2 processes

set -e  # Exit on any error

echo "🚀 Starting deployment for AI Photo Editor..."

# Create logs directory if it doesn't exist
mkdir -p logs

# Install frontend dependencies and build
echo "📦 Installing frontend dependencies..."
npm ci --only=production

# Install serve globally for PM2 frontend process
echo "📦 Installing serve globally..."
npm install -g serve

echo "🔨 Building frontend..."
npm run build

# Install backend dependencies and build
echo "📦 Installing backend dependencies..."
cd server
npm ci --only=production
npm run build
cd ..

# Restart PM2 processes
echo "🔄 Restarting PM2 processes..."
pm2 reload ecosystem.config.js --env production

# Setup PM2 startup (run once to enable auto-restart on server reboot)
echo "🚀 Setting up PM2 startup script..."
pm2 startup || echo "PM2 startup already configured or needs manual setup"
pm2 save

# Show PM2 status
echo "📊 PM2 Process Status:"
pm2 status

echo "✅ Deployment completed successfully!"
echo "🌐 Frontend: Running on PM2 (port 5173) → Nginx proxy"
echo "⚡ Backend: Running on PM2 (port 3001) → Nginx proxy"
echo "🔒 Ports: Only 80/443 exposed externally via Nginx"
echo "📝 Logs: Check ./logs/ directory"
