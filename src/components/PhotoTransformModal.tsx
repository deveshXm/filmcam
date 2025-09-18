import React, { useState } from 'react';
import { EffectSelector } from './EffectSelector';
import { ProcessedImage } from './ProcessedImage';
import { LoadingSpinner } from './LoadingSpinner';
import { imageService } from '../services/imageService';
import { useAuth } from '../contexts/AuthContext';
import type { ImageUpload as ImageUploadType, EffectTemplate, ImageProcessingResponse } from '../../types';

interface PhotoTransformModalProps {
  isOpen: boolean;
  onClose: () => void;
  uploadedImage: ImageUploadType;
}

export const PhotoTransformModal = ({ isOpen, onClose, uploadedImage }: PhotoTransformModalProps): React.JSX.Element => {
  const { refreshUserData } = useAuth();
  const [selectedEffect, setSelectedEffect] = useState<EffectTemplate | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEffectSelect = (effect: EffectTemplate) => {
    setSelectedEffect(effect);
    setError(null);
    setProcessedImage(null);
  };

  const handleProcessImage = async () => {
    if (!selectedEffect) return;

    setIsProcessing(true);
    setError(null);

    try {
      const response: ImageProcessingResponse = await imageService.processImage({
        image: uploadedImage.base64,
        effect: selectedEffect.id,
        metadata: {
          format: uploadedImage.file.type,
        },
      });

      if (response.success && response.data) {
        setProcessedImage(response.data.processedImage);
        await refreshUserData();
      } else {
        setError(response.error || 'Failed to process image');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Processing error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setSelectedEffect(null);
    setProcessedImage(null);
    setError(null);
    setIsProcessing(false);
  };

  if (!isOpen) return <></>;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-stone-900/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-2 sm:p-4">
        <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] flex flex-col">
          
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-stone-200 px-4 sm:px-8 py-4 sm:py-6 rounded-t-2xl sm:rounded-t-3xl z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-2xl font-semibold text-stone-900">Transform Your Photo</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-4 sm:py-6">
            <div className="flex flex-col gap-6 sm:gap-8">
              
              {/* Top Section - Image Preview */}
              <div className="flex flex-col">
                <h3 className="text-base sm:text-lg font-medium text-stone-900 mb-3 sm:mb-4">Your Photo</h3>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <img
                      src={uploadedImage.preview}
                      alt="Your photo"
                      className="max-w-full max-h-60 sm:max-h-80 object-contain rounded-xl sm:rounded-2xl shadow-medium border border-stone-200"
                    />
                    <div className="mt-2 sm:mt-3">
                      <p className="text-xs sm:text-sm text-stone-600 font-medium truncate max-w-xs">{uploadedImage.file.name}</p>
                      <p className="text-xs text-stone-500">{(uploadedImage.file.size / 1024 / 1024).toFixed(1)} MB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section - Effect Selection */}
              <div className="flex flex-col">
                <h3 className="text-base sm:text-lg font-medium text-stone-900 mb-3 sm:mb-4">Choose Film Effect</h3>
                <div>
                  <EffectSelector onEffectSelect={handleEffectSelect} selectedEffect={selectedEffect} />
                </div>
              </div>
              
            </div>
          </div>

          {/* Fixed Bottom Actions */}
          <div className="border-t border-stone-200 px-4 sm:px-8 py-4 sm:py-6 bg-stone-50 rounded-b-2xl sm:rounded-b-3xl">
            {/* Process Button */}
            {selectedEffect && !processedImage && !isProcessing && (
              <div className="text-center">
                <button
                  onClick={handleProcessImage}
                  className="px-12 py-4 bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                >
                  Apply {selectedEffect.name}
                </button>
              </div>
            )}

            {/* Processing Status */}
            {isProcessing && (
              <div className="text-center">
                <div className="bg-white rounded-2xl p-6 max-w-md mx-auto border border-stone-200">
                  <LoadingSpinner message="" />
                  <p className="text-stone-700 mt-4 font-medium">Applying film effect...</p>
                  <p className="text-stone-500 text-sm mt-2">This may take a few moments</p>
                </div>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="text-center">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 max-w-md mx-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                      <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-red-800 text-sm">Processing Error</p>
                      <p className="text-red-600 text-xs">{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Processed Result Actions */}
            {processedImage && (
              <div className="text-center flex gap-4 justify-center">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-stone-200 hover:bg-stone-300 text-stone-900 font-medium rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-soft hover:shadow-medium cursor-pointer"
                >
                  Try Another Effect
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-soft hover:shadow-medium cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </div>

          {/* Processed Result Display - Full Width Overlay */}
          {processedImage && (
            <div className="absolute inset-0 bg-white rounded-3xl flex flex-col">
              {/* Header */}
              <div className="border-b border-stone-200 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-medium text-stone-900">Your Transformed Photo</h3>
                    <p className="text-stone-600">
                      <span className="font-medium text-stone-900">{selectedEffect?.name}</span> effect applied
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Result Image */}
              <div className="flex-1 p-8 flex items-center justify-center">
                <ProcessedImage imageUrl={processedImage} effectName={selectedEffect?.name || ''} />
              </div>
              
              {/* Actions */}
              <div className="border-t border-stone-200 px-8 py-6 bg-stone-50">
                <div className="text-center flex gap-4 justify-center">
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-stone-200 hover:bg-stone-300 text-stone-900 font-medium rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-soft hover:shadow-medium cursor-pointer"
                  >
                    Try Another Effect
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-soft hover:shadow-medium cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
