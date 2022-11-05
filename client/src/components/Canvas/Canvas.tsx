import React, { FC } from 'react';
import './Canvas.scss';

interface CanvasProps {}

const Canvas: FC<CanvasProps> = () => (
  <div className="Canvas" data-testid="Canvas">
    Canvas Component
  </div>
);

export default Canvas;
