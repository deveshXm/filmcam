import { GoogleGenAI } from '@google/genai';

export class GeminiImageService {
  private ai: GoogleGenAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    
    this.ai = new GoogleGenAI({ apiKey });
  }

  async processImage(base64Image: string, effectId: string): Promise<string> {
    try {
      // Get the prompt for the selected effect
      const prompt = this.getEffectPrompt(effectId);
      
      if (!prompt) {
        throw new Error(`Unknown effect: ${effectId}`);
      }

      console.log(`Processing image with effect: ${effectId}`);
      console.log(`Using prompt: ${prompt}`);

      // Remove data URL prefix if present
      const cleanBase64 = base64Image.replace(/^data:image\/[a-z]+;base64,/, '');
      
      // For image editing (image + text to image), we need to provide both the image and text prompt
      const contents = [
        {
          text: prompt
        },
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: cleanBase64
          }
        }
      ];

      // Generate content using the correct API structure
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash-image-preview",
        contents: contents,
      });

      // Extract the processed image from response
      if (!response.candidates || response.candidates.length === 0) {
        throw new Error('No candidates returned from Gemini API');
      }

      const candidate = response.candidates[0];
      if (!candidate.content || !candidate.content.parts) {
        throw new Error('Invalid response structure from Gemini API');
      }

      const parts = candidate.content.parts;
      for (const part of parts) {
        if (part.text) {
          console.log('Response text:', part.text);
        } else if (part.inlineData) {
          // Return with data URL prefix for frontend display
          return `data:image/jpeg;base64,${part.inlineData.data}`;
        }
      }

      throw new Error('No image data found in response');
    } catch (error: any) {
      console.error('Gemini API error:', error);
      
      if (error.message?.includes('API key') || error.message?.includes('401')) {
        throw new Error('Invalid API key configuration');
      }
      
      if (error.message?.includes('quota') || error.message?.includes('429')) {
        throw new Error('API quota exceeded. Please try again later.');
      }
      
      if (error.message?.includes('400')) {
        throw new Error('Invalid request format. Please try with a different image.');
      }
      
      throw new Error(`Image processing failed: ${error.message || 'Unknown error'}`);
    }
  }

  private getEffectPrompt(effectId: string): string | null {
    const effectPrompts: Record<string, string> = {
      'acros_bw': 'Convert this image to black and white using Fujifilm Acros film simulation. Apply smooth gradation, deep rich blacks, beautiful highlight roll-off, and subtle film grain. Maintain excellent tonal separation and contrast while preserving all detail and composition.',
      
      'classic_chrome': 'Apply Fujifilm Classic Chrome film simulation to this image. Create a documentary-style look with slightly lower saturation, stronger contrast, and a distinctive Kodak-like color palette. Maintain photojournalism aesthetic with bold yet subdued tones.',
      
      'classic_negative': 'Apply Fujifilm Classic Negative film simulation to this image. Create rich, bold colors with nostalgic rendering reminiscent of 1990s-2000s photo albums. Apply complex color shifts where greens appear silvery, enhance skin tone warmth, and create emotionally-driven contrast.'
    };

    return effectPrompts[effectId] || null;
  }

  // Method to get available effects (for API documentation)
  getAvailableEffects(): string[] {
    return ['acros_bw', 'classic_chrome', 'classic_negative'];
  }
}
