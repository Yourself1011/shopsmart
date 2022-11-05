import React, { FC, useRef, useEffect, useContext } from "react";
import "./UserCanvas.scss";
import shop from "../../shop.json";
import { ListCtx } from "../ListContext/ListContext";

interface UserCanvasProps {}

const UserCanvas: FC<UserCanvasProps> = () => {
  let canvasRef: any = useRef(null);
  let context = useContext(ListCtx);

  useEffect(() => {
    let canvas = canvasRef.current;
    let ctx = canvas!.getContext("2d");
  }, [context]);

  return (
    <div className="UserCanvas" data-testid="UserCanvas">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default UserCanvas;
