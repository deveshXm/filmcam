import React, { useState } from 'react';
import { SimpleUpload } from '../components/SimpleUpload';
import { ImageCollage } from '../components/ImageCollage';
import { PhotoTransformModal } from '../components/PhotoTransformModal';
import { AuthButton } from '../components/AuthButton';
import { UsageIndicator } from '../components/UsageIndicator';
import { MinimalBackground } from '../components/LandingCollage';
import type { ImageUpload as ImageUploadType } from '../../types';

export const PhotoEditorPage = (): React.JSX.Element => {
  const [uploadedImage, setUploadedImage] = useState<ImageUploadType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageUpload = (imageData: ImageUploadType) => {
    setUploadedImage(imageData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUploadedImage(null);
  };

  return (
    <div className="min-h-screen relative">
      <MinimalBackground />
      
      {/* Navigation Header */}
      <nav className="relative z-20 px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Enhanced Logo */}
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-stone-900 to-stone-700 flex items-center justify-center shadow-medium">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-stone-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3z"/>
                </svg>
              </div>
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-stone-900 to-stone-700 opacity-20 blur-sm -z-10"></div>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-stone-900 tracking-tight">FilmCam AI</h1>
              <p className="text-xs sm:text-sm text-stone-500 font-medium hidden sm:block">AI-Powered Film Simulation</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <UsageIndicator />
            <AuthButton />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-stone-900 mb-4 sm:mb-6 tracking-tight leading-tight px-4">
              Transform your photos with
              <br className="hidden sm:block" />
              <span className="sm:block">
                <span className="font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  cinematic film effects
                </span>
              </span>
            </h2>
            <p className="text-base sm:text-lg text-stone-600 font-normal max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4">
              Upload any image and apply professional film simulation effects powered by AI. 
              From classic black & white to vintage color grading.
            </p>
          </div>

          {/* Image Collage with Integrated Upload Button */}
          <div className="mb-12 sm:mb-16">
            <ImageCollage uploadComponent={<SimpleUpload onImageUpload={handleImageUpload} uploadedImage={uploadedImage} />} />
          </div>

        </div>
      </main>

      {/* Photo Transform Modal */}
      {uploadedImage && (
        <PhotoTransformModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          uploadedImage={uploadedImage}
        />
      )}

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 mt-24">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-stone-500 text-sm">
            Powered by AI • Film simulations inspired by classic photography
          </p>
        </div>
      </footer>
    </div>
  );
};
