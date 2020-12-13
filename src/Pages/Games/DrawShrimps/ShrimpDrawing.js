import React from 'react';
import { shrimpDrawingBodyPath, shrimpDrawingEyePath } from './shrimpDrawingParts';

const ShrimpDrawing = ({ text, size, color }) => {
  return (
    <div className="shrimp-drawing">
      <svg 
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg" 
        x="0" 
        y="0" 
        viewBox="0 0 500 500"
        fill={color || '#666'}
        width={size || 250}
        height={size || 250}>
        <text x="40" y="69" className="shrimp-drawing__name">{text}</text>
        <path className="shrimp-drawing__body" d={shrimpDrawingBodyPath} />
        <path className="shrimp-drawing__eye" d={shrimpDrawingEyePath} />
      </svg>
    </div>
  );
}

export default ShrimpDrawing;
