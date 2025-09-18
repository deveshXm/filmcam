import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/userService';

const userService = new UserService();

// Initiate Google OAuth flow
export const googleAuthInitiate = async (req: Request, res: Response): Promise<void> => {
  try {
    const client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    const authorizeUrl = client.generateAuthUrl({
      access_type: 'offline',
      scope: ['profile', 'email'],
      prompt: 'select_account'
    });

    res.redirect(authorizeUrl);
  } catch (error) {
    console.error('Google auth initiate error:', error);
    res.redirect(`${process.env.CLIENT_URL}?error=auth_failed`);
  }
};

// Handle Google OAuth callback
export const googleAuthCallback = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code, error } = req.query;

    if (error) {
      console.error('Google OAuth error:', error);
      res.redirect(`${process.env.CLIENT_URL}?error=oauth_denied`);
      return;
    }

    if (!code) {
      res.redirect(`${process.env.CLIENT_URL}?error=no_code`);
      return;
    }

    const client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    // Exchange authorization code for tokens
    const { tokens } = await client.getToken(code as string);
    client.setCredentials(tokens);

    // Get user info
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      res.redirect(`${process.env.CLIENT_URL}?error=invalid_token`);
      return;
    }

    // Find or create user
    const user = await userService.findOrCreateUser({
      id: payload.sub,
      email: payload.email!,
      name: payload.name!,
    });

    // Generate JWT
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    const jwtToken = jwt.sign(
      { userId: user._id },
      jwtSecret,
      { expiresIn: '30d' }
    );

    // Redirect to frontend with token
    res.redirect(`${process.env.CLIENT_URL}?token=${jwtToken}`);

  } catch (error: any) {
    console.error('Google auth callback error:', error);
    res.redirect(`${process.env.CLIENT_URL}?error=auth_failed`);
  }
};

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId;
    const user = await userService.getUserById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
      return;
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          tier: user.tier,
          imageCount: user.imageCount,
        }
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get user profile',
      code: 'PROFILE_ERROR'
    });
  }
};
