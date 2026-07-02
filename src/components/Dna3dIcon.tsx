import React from 'react';

interface Dna3dIconProps {
  className?: string;
  size?: number | string;
}

export const Dna3dIcon: React.FC<Dna3dIconProps> = ({ className = '', size = '100%' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      style={{ width: size, height: size }}
      id="dna-3d-animated-icon"
    >
      <defs>
        {/* Deep 3D Gradients */}
        <linearGradient id="dna-grad-fg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0d9488" /> {/* Teal 600 */}
          <stop offset="50%" stopColor="#14b8a6" /> {/* Teal 500 */}
          <stop offset="100%" stopColor="#2dd4bf" /> {/* Teal 400 */}
        </linearGradient>
        
        <linearGradient id="dna-grad-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e1b4b" /> {/* Indigo 950 */}
          <stop offset="50%" stopColor="#0369a1" /> {/* Sky 700 */}
          <stop offset="100%" stopColor="#0ea5e9" /> {/* Sky 500 */}
        </linearGradient>

        <linearGradient id="dna-rung-grad-1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.3" />
        </linearGradient>

        <linearGradient id="dna-rung-grad-2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.3" />
        </linearGradient>

        {/* 3D Depth Keyframes for Sinusoidal Floating & Out-of-phase Rotation */}
        <style>
          {`
            @keyframes dna-float-fg {
              0%, 100% {
                transform: translateY(0px) scale(1);
                filter: drop-shadow(0 4px 6px rgba(20, 184, 166, 0.35));
              }
              50% {
                transform: translateY(-3px) scale(0.9);
                filter: drop-shadow(0 2px 3px rgba(20, 184, 166, 0.15));
              }
            }
            @keyframes dna-float-bg {
              0%, 100% {
                transform: translateY(0px) scale(0.85);
                filter: drop-shadow(0 1px 2px rgba(14, 165, 233, 0.1));
                opacity: 0.7;
              }
              50% {
                transform: translateY(3px) scale(1.05);
                filter: drop-shadow(0 6px 8px rgba(14, 165, 233, 0.4));
                opacity: 1;
              }
            }
            @keyframes dna-pulse-rung {
              0%, 100% {
                opacity: 0.6;
                stroke-width: 2.5px;
              }
              50% {
                opacity: 0.95;
                stroke-width: 3.5px;
              }
            }
            .dna-layer-fg {
              animation: dna-float-fg 3.5s ease-in-out infinite;
              transform-origin: center;
            }
            .dna-layer-bg {
              animation: dna-float-bg 3.5s ease-in-out infinite;
              transform-origin: center;
            }
            .dna-rung-pulse {
              animation: dna-pulse-rung 3.5s ease-in-out infinite;
            }
          `}
        </style>
      </defs>

      {/* Background Glow */}
      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(20, 184, 166, 0.04)" strokeWidth="1" />

      {/* Rungs (Hydrogen bonds in 3D perspective connecting nodes) */}
      <g>
        <line x1="22" y1="36" x2="22" y2="64" stroke="url(#dna-rung-grad-1)" className="dna-rung-pulse" style={{ animationDelay: '0s' }} strokeLinecap="round" />
        <line x1="36" y1="21" x2="36" y2="79" stroke="url(#dna-rung-grad-2)" className="dna-rung-pulse" style={{ animationDelay: '0.4s' }} strokeLinecap="round" />
        <line x1="50" y1="16" x2="50" y2="84" stroke="url(#dna-rung-grad-1)" className="dna-rung-pulse" style={{ animationDelay: '0.8s' }} strokeLinecap="round" />
        <line x1="64" y1="21" x2="64" y2="79" stroke="url(#dna-rung-grad-2)" className="dna-rung-pulse" style={{ animationDelay: '1.2s' }} strokeLinecap="round" />
        <line x1="78" y1="36" x2="78" y2="64" stroke="url(#dna-rung-grad-1)" className="dna-rung-pulse" style={{ animationDelay: '1.6s' }} strokeLinecap="round" />
      </g>

      {/* DNA Helix Backbones */}
      {/* 1. Background strand (Slightly smaller, deeper/darker blue, out-of-phase floating) */}
      <path
        d="M 12,68 C 24,93 38,89 50,84 C 62,79 76,79 88,68"
        fill="none"
        stroke="url(#dna-grad-bg)"
        strokeWidth="6"
        strokeLinecap="round"
        className="dna-layer-bg"
      />

      {/* 2. Foreground strand (Thicker, glowing teal, primary focus) */}
      <path
        d="M 12,32 C 24,7 38,11 50,16 C 62,21 76,21 88,32"
        fill="none"
        stroke="url(#dna-grad-fg)"
        strokeWidth="7"
        strokeLinecap="round"
        className="dna-layer-fg"
      />

      {/* Nodes (Glossy molecular spheres) */}
      {/* Background Nodes */}
      <g className="dna-layer-bg">
        <circle cx="22" cy="64" r="5" fill="url(#dna-grad-bg)" />
        <circle cx="36" cy="79" r="5.5" fill="url(#dna-grad-bg)" />
        <circle cx="50" cy="84" r="6" fill="url(#dna-grad-bg)" />
        <circle cx="64" cy="79" r="5.5" fill="url(#dna-grad-bg)" />
        <circle cx="78" cy="64" r="5" fill="url(#dna-grad-bg)" />
      </g>

      {/* Foreground Nodes with Highlights */}
      <g className="dna-layer-fg">
        {/* Sphere 1 */}
        <circle cx="22" cy="36" r="5.5" fill="url(#dna-grad-fg)" />
        <circle cx="20.5" cy="34.5" r="1.5" fill="#ffffff" opacity="0.6" />

        {/* Sphere 2 */}
        <circle cx="36" cy="21" r="6" fill="url(#dna-grad-fg)" />
        <circle cx="34" cy="19" r="1.8" fill="#ffffff" opacity="0.6" />

        {/* Sphere 3 (Center) */}
        <circle cx="50" cy="16" r="6.5" fill="url(#dna-grad-fg)" />
        <circle cx="48" cy="14" r="2" fill="#ffffff" opacity="0.75" />

        {/* Sphere 4 */}
        <circle cx="64" cy="21" r="6" fill="url(#dna-grad-fg)" />
        <circle cx="62" cy="19" r="1.8" fill="#ffffff" opacity="0.6" />

        {/* Sphere 5 */}
        <circle cx="78" cy="36" r="5.5" fill="url(#dna-grad-fg)" />
        <circle cx="76.5" cy="34.5" r="1.5" fill="#ffffff" opacity="0.6" />
      </g>
    </svg>
  );
};
