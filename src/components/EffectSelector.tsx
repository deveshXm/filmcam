import React, { useState, useEffect } from 'react';
import type { EffectTemplate } from '../../types';

interface EffectSelectorProps {
  onEffectSelect: (effect: EffectTemplate) => void;
  selectedEffect: EffectTemplate | null;
}

export const EffectSelector = ({ onEffectSelect, selectedEffect }: EffectSelectorProps): React.JSX.Element => {
  const [effects, setEffects] = useState<EffectTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load effects from templates.json
    const loadEffects = async () => {
      try {
        const response = await fetch('/templates.json');
        const data = await response.json();
        setEffects(data);
      } catch (error) {
        console.error('Error loading effects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEffects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-6 h-6 border-2 border-stone-300 border-t-stone-700 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <div className="flex gap-6 sm:gap-8 overflow-x-auto py-6 px-6 max-w-full">
          {effects.map((effect) => (
            <div
              key={effect.id}
              className="flex-shrink-0 p-3"
            >
              <button
                onClick={() => onEffectSelect(effect)}
                className={`group relative text-left transition-all duration-300 cursor-pointer block w-56 sm:w-64 ${
                  selectedEffect?.id === effect.id
                    ? 'ring-2 ring-indigo-500 ring-offset-2 rounded-xl'
                    : ''
                }`}
              >
                <div className={`bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden border ${
                  selectedEffect?.id === effect.id
                    ? 'border-indigo-400'
                    : 'border-stone-200 group-hover:border-stone-300'
                }`}>
            
            {/* Effect Preview */}
            <div className="aspect-[4/3] overflow-hidden relative">
              {effect.image ? (
                <img
                  src={`/images/${effect.image}`}
                  alt={effect.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-400 text-sm font-medium">
                  No Preview Available
                </div>
              )}
              
              {/* Category badge */}
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  effect.category === 'monochrome' 
                    ? 'bg-stone-800/80 text-white' 
                    : 'bg-white/90 text-stone-800'
                }`}>
                  {effect.category === 'monochrome' ? 'B&W' : 'Color'}
                </span>
              </div>
            </div>
            
            {/* Effect Info */}
            <div className="p-3 sm:p-4">
              <h4 className={`font-semibold text-sm sm:text-base mb-1 transition-colors ${
                selectedEffect?.id === effect.id ? 'text-indigo-600' : 'text-stone-900'
              }`}>
                {effect.name}
              </h4>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                {effect.description}
              </p>
            </div>
          </div>
          
          {/* Selection indicator */}
          {selectedEffect?.id === effect.id && (
            <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center shadow-medium">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};