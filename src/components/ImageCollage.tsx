import React from 'react';

interface ImageCollageProps {
  uploadComponent: React.ReactNode;
}

export const ImageCollage = ({ uploadComponent }: ImageCollageProps): React.JSX.Element => {
  const images = [
    { src: '/landing/image_1.jpg', className: 'w-24 h-32' },
    { src: '/landing/pexels-8percent-media-1038146328-30439897.jpg', className: 'w-20 h-20' },
    { src: '/landing/pexels-alyona-nagel-1468385055-33892361.jpg', className: 'w-28 h-36' },
    { src: '/landing/pexels-cerenvisuals-33942031.jpg', className: 'w-32 h-24' },
    { src: '/landing/pexels-ezgi-kaya-498261122-33943116.jpg', className: 'w-20 h-28' },
    { src: '/landing/pexels-gizem-cayir-2155453358-33892915.jpg', className: 'w-24 h-20' },
    { src: '/landing/pexels-gizem-cayir-2155453358-33935778.jpg', className: 'w-28 h-32' },
    { src: '/landing/pexels-julian-dahl-2149417377-30600492.jpg', className: 'w-20 h-24' },
    { src: '/landing/pexels-l-c-nguy-n-557025598-33946242.jpg', className: 'w-32 h-28' },
    { src: '/landing/pexels-l-c-nguy-n-557025598-33946357.jpg', className: 'w-24 h-24' },
    { src: '/landing/pexels-l-c-nguy-n-557025598-33946390.jpg', className: 'w-20 h-32' },
  ];

  return (
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-50/20 to-stone-100/20 rounded-3xl"></div>
      
      {/* Scattered arrangement with proper spacing */}
      <div className="relative min-h-[350px] sm:min-h-[450px] flex items-center justify-center">
        
        {/* Top row - well spaced */}
        <div className="absolute top-0 left-[10%]">
          <img
            src={images[0].src}
            alt="AI processed"
            className="w-18 h-24 sm:w-24 sm:h-32 object-cover rounded-lg sm:rounded-2xl shadow-medium hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="absolute top-6 left-[35%]">
          <img
            src={images[1].src}
            alt="AI processed"
            className="w-14 h-14 sm:w-18 sm:h-18 object-cover rounded-lg sm:rounded-xl shadow-soft hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="absolute top-2 right-[35%]">
          <img
            src={images[2].src}
            alt="AI processed"
            className="w-16 h-20 sm:w-20 sm:h-26 object-cover rounded-lg sm:rounded-xl shadow-medium hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="absolute top-0 right-[10%]">
          <img
            src={images[3].src}
            alt="AI processed"
            className="w-18 h-24 sm:w-24 sm:h-32 object-cover rounded-lg sm:rounded-2xl shadow-soft hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Left side - vertically distributed */}
        <div className="absolute left-[5%] top-[30%]">
          <img
            src={images[4].src}
            alt="AI processed"
            className="w-16 h-20 sm:w-20 sm:h-26 object-cover rounded-lg sm:rounded-xl shadow-medium hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="absolute left-[15%] top-[60%]">
          <img
            src={images[5].src}
            alt="AI processed"
            className="w-14 h-18 sm:w-18 sm:h-24 object-cover rounded-lg sm:rounded-xl shadow-soft hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Right side - vertically distributed */}
        <div className="absolute right-[5%] top-[30%]">
          <img
            src={images[6].src}
            alt="AI processed"
            className="w-16 h-20 sm:w-20 sm:h-26 object-cover rounded-lg sm:rounded-xl shadow-medium hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="absolute right-[15%] top-[60%]">
          <img
            src={images[7].src}
            alt="AI processed"
            className="w-14 h-18 sm:w-18 sm:h-24 object-cover rounded-lg sm:rounded-xl shadow-soft hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Bottom row - well spaced */}
        <div className="absolute bottom-0 left-[15%]">
          <img
            src={images[8].src}
            alt="AI processed"
            className="w-16 h-16 sm:w-22 sm:h-22 object-cover rounded-lg sm:rounded-xl shadow-medium hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="absolute bottom-8 left-[40%]">
          <img
            src={images[9].src}
            alt="AI processed"
            className="w-12 h-16 sm:w-16 sm:h-20 object-cover rounded-lg sm:rounded-xl shadow-soft hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="absolute bottom-8 right-[40%]">
          <img
            src={images[10].src}
            alt="AI processed"
            className="w-12 h-16 sm:w-16 sm:h-20 object-cover rounded-lg sm:rounded-xl shadow-soft hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="absolute bottom-0 right-[15%]">
          <img
            src={images[1].src}
            alt="AI processed"
            className="w-16 h-16 sm:w-22 sm:h-22 object-cover rounded-lg sm:rounded-xl shadow-medium hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Center button - naturally positioned with breathing room */}
        <div className="z-10 relative">
          {uploadComponent}
        </div>
        
      </div>
    </div>
  );
};
