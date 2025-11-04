import React from 'react';

/**
 * SecondOpinionLogo Component
 * A theme-aware, high-quality SVG logo component
 * 
 * @param {Object} props
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.width - Width in pixels (default: 200)
 * @param {number} props.height - Height in pixels (default: auto)
 * @param {boolean} props.showText - Whether to show text alongside icon (default: true)
 * @param {string} props.variant - Color variant: 'default', 'white' (default: 'default')
 */
const SecondOpinionLogo = ({ 
  className = '', 
  width = 200, 
  height, 
  showText = true,
  variant = 'default'
}) => {
  // Calculate proper dimensions maintaining aspect ratio (886:955 = ~0.93:1)
  const iconWidth = showText ? 48 : width;
  const iconHeight = showText ? 52 : (height || Math.round(width * 1.08));

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Logo Icon Container - Removes background and applies theme colors */}
      <div 
        className={`transition-all duration-200 ${
          variant === 'white' 
            ? '[filter:brightness(0)_invert(1)]' 
            : 'dark:[filter:hue-rotate(200deg)_saturate(1.5)_brightness(1.3)]'
        }`}
        style={{ 
          width: iconWidth,
          height: iconHeight,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <img
          src="/Second Opinion New.svg"
          alt="Second Opinion Logo"
          className="w-full h-full"
          style={{ 
            imageRendering: '-webkit-optimize-contrast',
            objectFit: 'contain',
            mixBlendMode: 'darken',
          }}
        />
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
            Second Opinion
          </span>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Expert Medical Consultations
          </span>
        </div>
      )}
    </div>
  );
};

export default SecondOpinionLogo;
