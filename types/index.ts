// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Image processing types
export interface ImageUpload {
  file: File;
  preview: string;
  base64: string;
}

export interface EffectTemplate {
  id: string;
  name: string;
  description: string;
  prompt: string;
  image: string;
  category: 'monochrome' | 'color';
}

export interface ImageProcessingRequest {
  image: string;
  effect: string;
  metadata?: {
    format: string;
  };
}

export interface ImageProcessingResponse {
  success: boolean;
  data?: {
    processedImage: string;
    processingTime: number;
    effectApplied: string;
  };
  error?: string;
  code?: string;
}

// User and Authentication types
export interface User {
  _id: string;
  googleId: string;
  email: string;
  name: string;
  tier: 'free' | 'premium';
  imageCount: number;
  createdAt: Date;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  tier: 'free' | 'premium';
  imageCount: number;
}

export interface AuthContextType {
  user: AuthUser | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
  refreshUserData: () => Promise<void>;
}
