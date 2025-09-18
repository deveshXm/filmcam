import React, { useState } from 'react';

interface ProcessedImageProps {
  imageUrl: string;
  effectName: string;
}

export const ProcessedImage = ({ imageUrl, effectName }: ProcessedImageProps): React.JSX.Element => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      // Convert base64 to blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `processed-${effectName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.jpg`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download image');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Processed Image Display */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-medium border border-stone-200">
        <img
          src={imageUrl}
          alt={`Processed with ${effectName}`}
          className="w-full h-auto max-h-[600px] object-contain"
        />
      </div>

      {/* Download Button */}
      <div className="flex justify-center">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-medium transition-all duration-300 shadow-soft hover:shadow-medium ${
            isDownloading
              ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
              : 'bg-stone-900 text-stone-50 hover:bg-stone-800 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer'
          }`}
        >
          {isDownloading ? (
            <>
              <div className="w-5 h-5 border-2 border-stone-400 border-t-transparent animate-spin rounded-full"></div>
              <span>Downloading...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Download High Quality</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
