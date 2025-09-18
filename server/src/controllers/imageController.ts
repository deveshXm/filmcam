import { Request, Response } from 'express';
import { GeminiImageService } from '../services/geminiService';
import { UserService } from '../services/userService';
import { AuthRequest } from '../middleware/authMiddleware';

let geminiService: GeminiImageService | null = null;
let userService: UserService | null = null;

const getGeminiService = (): GeminiImageService => {
  if (!geminiService) {
    geminiService = new GeminiImageService();
  }
  return geminiService;
};

const getUserService = (): UserService => {
  if (!userService) {
    userService = new UserService();
  }
  return userService;
};

export const processImage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { image, effect, metadata } = req.body;
    const userId = req.userId!;

    // Validate input
    if (!image || !effect) {
      res.status(400).json({
        success: false,
        error: 'Image and effect are required',
        code: 'MISSING_PARAMETERS'
      });
      return;
    }

    // Validate base64 format
    if (!image.startsWith('data:image/')) {
      res.status(400).json({
        success: false,
        error: 'Invalid image format. Expected base64 data URL',
        code: 'INVALID_FORMAT'
      });
      return;
    }

    // Validate effect ID
    const availableEffects = getGeminiService().getAvailableEffects();
    if (!availableEffects.includes(effect)) {
      res.status(400).json({
        success: false,
        error: `Invalid effect. Available effects: ${availableEffects.join(', ')}`,
        code: 'INVALID_EFFECT'
      });
      return;
    }

    // Check user's image processing quota
    const { canProcess, remaining } = await getUserService().canProcessImage(userId);
    if (!canProcess) {
      res.status(429).json({
        success: false,
        error: 'Image processing limit reached. Please upgrade to premium.',
        code: 'QUOTA_EXCEEDED',
        data: { remaining }
      });
      return;
    }

    console.log(`Processing image with effect: ${effect} for user: ${userId}`);
    console.log(`Image metadata:`, metadata);

    const startTime = Date.now();
    
    // Process image with Gemini
    const processedImage = await getGeminiService().processImage(image, effect);
    
    // Increment user's image count
    const updatedUser = await getUserService().incrementImageCount(userId);
    
    const processingTime = (Date.now() - startTime) / 1000;

    console.log(`Image processed successfully in ${processingTime.toFixed(2)}s`);

    res.json({
      success: true,
      data: {
        processedImage,
        processingTime,
        effectApplied: effect,
        user: updatedUser ? {
          tier: updatedUser.tier,
          imageCount: updatedUser.imageCount,
          remaining: (updatedUser.tier === 'premium' ? 100 : 5) - updatedUser.imageCount
        } : undefined
      },
      message: 'Image processed successfully'
    });

  } catch (error: any) {
    console.error('Image processing error:', error);
    
    // Handle specific error types
    if (error.message?.includes('API key')) {
      res.status(500).json({
        success: false,
        error: 'API configuration error. Please contact support.',
        code: 'API_CONFIG_ERROR'
      });
      return;
    }
    
    if (error.message?.includes('quota')) {
      res.status(429).json({
        success: false,
        error: 'Service temporarily unavailable due to high demand. Please try again later.',
        code: 'QUOTA_EXCEEDED'
      });
      return;
    }
    
    if (error.message?.includes('timeout')) {
      res.status(408).json({
        success: false,
        error: 'Processing timeout. Please try with a smaller image.',
        code: 'TIMEOUT_ERROR'
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: 'Failed to process image. Please try again.',
      code: 'PROCESSING_ERROR'
    });
  }
};

export const getAvailableEffects = async (req: Request, res: Response): Promise<void> => {
  try {
    const effects = getGeminiService().getAvailableEffects();
    
    res.json({
      success: true,
      data: {
        effects,
        count: effects.length
      },
      message: 'Available effects retrieved successfully'
    });
  } catch (error) {
    console.error('Error getting available effects:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve available effects',
      code: 'EFFECTS_ERROR'
    });
  }
};

export const healthCheck = async (req: Request, res: Response): Promise<void> => {
  try {
    // Test if Gemini service is properly configured
    const effects = getGeminiService().getAvailableEffects();
    
    res.json({
      success: true,
      data: {
        status: 'healthy',
        availableEffects: effects.length,
        timestamp: new Date().toISOString()
      },
      message: 'Image processing service is healthy'
    });
  } catch (error: any) {
    console.error('Health check failed:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Service health check failed',
      code: 'HEALTH_CHECK_FAILED'
    });
  }
};
