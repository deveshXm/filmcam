# 🚀 FilmCam Deployment Guide - Digital Ocean

## 📋 Prerequisites
- ✅ Environment variables already setup
- ✅ MongoDB cloud service configured
- ✅ SSL certificates (you'll handle Let's Encrypt)
- ✅ Code cloned to `/var/www/filmcam`

## 🔧 Server Setup

### 1. Install Dependencies
```bash
# Install Node.js, PM2, and Nginx (if not already installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs nginx

# Install PM2 globally
sudo npm install -g pm2
```

### 2. Configure Nginx
```bash
# Copy nginx config
sudo cp /var/www/filmcam/nginx.conf /etc/nginx/sites-available/filmcam
sudo ln -s /etc/nginx/sites-available/filmcam /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm -f /etc/nginx/sites-enabled/default

# Test and reload nginx
sudo nginx -t
sudo systemctl reload nginx
```

### 3. Firewall Configuration
```bash
# Only expose HTTP and HTTPS ports
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Internal ports 3001 and 5173 are NOT exposed externally
# They're only accessible internally via Nginx proxy
```

## 🚀 Deployment

### Initial Deployment
```bash
cd /var/www/filmcam
./deploy.sh
```

### Subsequent Deployments
```bash
cd /var/www/filmcam
git pull origin main
./deploy.sh
```

## 📊 Management Commands

### PM2 Process Management
```bash
pm2 status                    # Check process status
pm2 logs                      # View all logs
pm2 logs filmcam-frontend     # Frontend logs only
pm2 logs filmcam-backend      # Backend logs only
pm2 restart all               # Restart all processes
pm2 reload ecosystem.config.js # Zero-downtime reload
pm2 monit                     # Real-time monitoring
```

### Nginx Management
```bash
sudo nginx -t                 # Test configuration
sudo systemctl reload nginx   # Reload configuration
sudo systemctl status nginx   # Check status
```

## 🌐 Traffic Flow

```
Internet → flowtiny.com:443 (HTTPS)
    ↓
Nginx (SSL termination + routing)
    ↓
├── /api/* → localhost:3001 (Backend PM2 process)
└── /*     → localhost:5173 (Frontend PM2 process)
```

## 🔒 Security Notes

- **Ports 3001 & 5173**: Internal only, not exposed to internet
- **Port 80**: Redirects to HTTPS
- **Port 443**: Main entry point with SSL
- **Nginx**: Acts as reverse proxy and SSL terminator

## 📝 Log Locations

- **PM2 Logs**: `/var/www/filmcam/logs/`
- **Nginx Logs**: `/var/log/nginx/`
- **System Logs**: `journalctl -u nginx` or `journalctl -f`

## 🔄 Auto-Restart Setup

The deployment script automatically configures PM2 to restart processes on server reboot:
- `pm2 startup` - Creates system startup script
- `pm2 save` - Saves current process list

Your FilmCam app will automatically start after server restarts! 🎉
