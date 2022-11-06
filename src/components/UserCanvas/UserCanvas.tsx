import React, { FC, useRef, useEffect, useContext } from "react";
import "./UserCanvas.scss";
import shop from "../../shop.json";

interface UserCanvasProps {}

const UserCanvas: FC<UserCanvasProps> = () => {
  let canvasRef: any = useRef(null);

  useEffect(() => {
    let canvas = canvasRef.current;
    let ctx = canvas!.getContext("2d");
    let unit = 49;

    ctx.fillStyle = "#444";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "16px Verdana";
    ctx.globalCompositeOperation = "destination-over";

    for (let i = 0; i < 14; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * unit);
      ctx.lineTo(14 * unit, i * unit);
      ctx.stroke();
    }
    for (let i = 0; i < 14; i++) {
      ctx.beginPath();
      ctx.moveTo(i * unit, 0);
      ctx.lineTo(i * unit, 14 * unit);
      ctx.stroke();
    }

    for (let row = 0; row < 13; row++) {
      for (let column = 0; column < 13; column++) {
        if (shop.grid[row][column] === 1) {
          ctx.fillStyle = "#444";
          ctx.fillRect(column * unit, row * unit, unit, unit);
        } else if (shop.grid[row][column] > 1) {
          ctx.fillStyle = "#e22";
          ctx.fillRect(column * unit, row * unit, unit, unit);

          ctx.globalCompositeOperation = "source-over";

          ctx.fillStyle = "#fff";

          ctx.fillText(
            `${shop.grid[row][column]}: ${shop.items[shop.grid[row][column]]}`,
            column * unit + 49 / 2,
            row * unit + 49 / 2
          );
          ctx.globalCompositeOperation = "destination-over";
        }
      }
    }

    ctx.fillStyle = "#2e2";
    ctx.fillRect(0, 0, unit, unit);
  }, []);

  return (
    // <div className="UserCanvas" data-testid="UserCanvas">
    <canvas ref={canvasRef} width="686" height="686" />
    // </div>
  );
};

export default UserCanvas;
