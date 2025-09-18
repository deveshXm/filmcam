import { Router } from 'express';
import { processImage, getAvailableEffects, healthCheck } from '../controllers/imageController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// POST /api/images/process - Process an image with selected effect (protected)
router.post('/process', authenticateToken, processImage);

// GET /api/images/effects - Get available effects
router.get('/effects', getAvailableEffects);

// GET /api/images/health - Health check for image processing service
router.get('/health', healthCheck);

export default router;
