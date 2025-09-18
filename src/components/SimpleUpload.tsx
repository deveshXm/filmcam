import React, { useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { ImageUpload as ImageUploadType } from '../../types';

interface SimpleUploadProps {
  onImageUpload: (imageData: ImageUploadType) => void;
  uploadedImage: ImageUploadType | null;
}

export const SimpleUpload = ({ onImageUpload, uploadedImage }: SimpleUploadProps): React.JSX.Element => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAuthRedirect = () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
    window.location.href = `${apiUrl}/auth/google`;
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const processFile = async (file: File) => {
    if (!user) {
      handleAuthRedirect();
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File size must be less than 10MB');
      return;
    }

    try {
      const base64 = await convertFileToBase64(file);
      const preview = URL.createObjectURL(file);
      
      const imageData: ImageUploadType = {
        file,
        preview,
        base64,
      };

      onImageUpload(imageData);
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing the image file');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleButtonClick = () => {
    if (!user) {
      handleAuthRedirect();
      return;
    }
    fileInputRef.current?.click();
  };

  return (
    <div className="text-center">
      {/* Upload Button - No background, integrates with collage */}
      <button
        onClick={handleButtonClick}
        className="px-6 sm:px-10 py-3 sm:py-4 bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:translate-y-0 active:scale-100 cursor-pointer text-sm sm:text-lg border-2 border-stone-800"
      >
        {user ? 'Choose Your Photo' : 'Sign in to Upload'}
      </button>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload info - minimal */}
      {!uploadedImage && (
        <p className="text-xs text-stone-600 mt-2 font-medium">
          JPEG, PNG, WebP
        </p>
      )}
    </div>
  );
};
