import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface AppLogoProps {
  size?: number;
}

const AppLogo: React.FC<AppLogoProps> = ({ size = 40 }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    {/* Outer Hexagon Background */}
    <Path 
      d="M50 5 L93 28 V72 L50 95 L7 72 V28 Z" 
      fill="#fdf0d5" 
      stroke="#003049" 
      strokeWidth="4" 
    />
    
    {/* Internal Structure (Cube-like) */}
    <Path d="M50 50 L93 28" stroke="#003049" strokeWidth="3" />
    <Path d="M50 50 L7 28" stroke="#003049" strokeWidth="3" />
    <Path d="M50 50 L50 95" stroke="#003049" strokeWidth="3" />
    
    {/* The Core (Atomic Red) */}
    <Circle cx="50" cy="50" r="12" fill="#c1121f" stroke="#003049" strokeWidth="2" />
    
    {/* Orbital Nodes */}
    <Circle cx="93" cy="28" r="4" fill="#003049" />
    <Circle cx="7" cy="28" r="4" fill="#003049" />
    <Circle cx="50" cy="95" r="4" fill="#003049" />
    
    {/* Decorative Tech Marks */}
   
  </Svg>
);

export default AppLogo;
