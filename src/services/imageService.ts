import axios from 'axios';
import type { ImageProcessingRequest, ImageProcessingResponse } from '../../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const imageService = {
  async processImage(request: ImageProcessingRequest): Promise<ImageProcessingResponse> {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(`${API_BASE_URL}/images/process`, request, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        timeout: 60000, // 60 second timeout for AI processing
      });

      return response.data;
    } catch (error: any) {
      console.error('Image processing API error:', error);
      
      if (error.response) {
        return error.response.data;
      }
      
      if (error.code === 'ECONNABORTED') {
        return {
          success: false,
          error: 'Request timed out. Please try again.',
          code: 'TIMEOUT_ERROR'
        };
      }
      
      return {
        success: false,
        error: 'Network error occurred. Please check your connection.',
        code: 'NETWORK_ERROR'
      };
    }
  }
};
