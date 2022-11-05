import React, { FC, useRef, useEffect } from "react";
import "./Canvas.scss";

interface CanvasProps {}

const Canvas: FC<CanvasProps> = () => {
  let canvasRef: any = useRef(null);

  useEffect(() => {
    let canvas = canvasRef.current;
    let ctx = canvas!.getContext("2d");
  }, []);

  return (
    <div className="Canvas" data-testid="Canvas">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Canvas;
