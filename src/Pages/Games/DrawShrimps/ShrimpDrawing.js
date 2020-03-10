import React, { useRef, useEffect } from 'react';
import { shrimpDrawingBodyPath, shrimpDrawingEyePath } from './shrimpDrawingParts';

const ShrimpDrawing = ({ text }) => {
  const shrimpCanvas = useRef(null);

  useEffect(
    () => {
      const canvas = shrimpCanvas.current;
      const ctx = canvas.getContext('2d');
      const bodyPath = new Path2D(shrimpDrawingBodyPath);
      const eyePath = new Path2D(shrimpDrawingEyePath);
      ctx.stroke(bodyPath);
      ctx.stroke(eyePath);
      ctx.font = '48px serif';
      ctx.strokeText(text, 50, 50);
      ctx.scale(.6, .6);
    },
    [text]
  );

  return (
    <canvas ref={shrimpCanvas} width={500} height={500} className="shrimp-drawing" />
  );
};

export default ShrimpDrawing;
