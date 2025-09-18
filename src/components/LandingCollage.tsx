import React from 'react';

export const MinimalBackground = (): React.JSX.Element => {
  return (
    <div className="fixed inset-0">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200" />
      
      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Soft vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(120, 113, 108, 0.03) 100%)'
        }}
      />
    </div>
  );
};


