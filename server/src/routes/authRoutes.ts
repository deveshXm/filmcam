import { Router } from 'express';
import { googleAuthInitiate, googleAuthCallback, getUserProfile } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Google OAuth flow
router.get('/google', googleAuthInitiate);
router.get('/google/callback', googleAuthCallback);

// Get user profile (protected)
router.get('/profile', authenticateToken, getUserProfile);

// Mock DodoPayments webhook for premium upgrade
router.post('/webhook/dodo', (req, res) => {
  // TODO: Implement actual DodoPayments webhook verification
  console.log('Mock DodoPayments webhook received:', req.body);
  
  res.json({
    success: true,
    message: 'Webhook processed (mocked)'
  });
});

export default router;
