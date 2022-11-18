import React, { FC, useRef, useEffect, useContext, useState } from "react";
import "./UserCanvas.scss";
import { ListCtx } from "../ListContext/ListContext";
import shop from "../../shop.json";

interface UserCanvasProps {}

const UserCanvas: FC<UserCanvasProps> = () => {
  let canvasRef: any = useRef(null);
  let listContext = useContext(ListCtx);
  let [path, changePath] = useState([[0]]);

  useEffect(() => {
    let canvas = canvasRef.current;
    let ctx = canvas!.getContext("2d");
    let unit = 49;

    ctx.clearRect(0, 0, unit * 14, unit * 14);

    ctx.fillStyle = "#444";
    ctx.strokeStyle = "#444";
    ctx.lineWidth = "1";
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

    console.log(path);

    if (path[0].length !== 1) {
      ctx.strokeStyle = "#2e2";
      ctx.lineWidth = "5";
      ctx.beginPath();
      let firstItem = path[0];
      ctx.moveTo(
        firstItem[0] * unit + unit / 2,
        firstItem[1] * unit + unit / 2
      );
      for (let j of path) {
        ctx.lineTo(j[1] * unit + unit / 2, j[0] * unit + unit / 2);
      }
      ctx.stroke();
    }
  }, [path]);

  useEffect(() => {
    if (!listContext?.order?.length) {
      return;
    }

    let keys = [];
    let mstSet = [];

    for (let i in listContext?.order) {
      keys.push(1000000);
    }
    keys[0] = 0;

    while (mstSet.length - 1 !== listContext?.order.length) {
      let min = Math.min(...keys);
      let index: number = keys.indexOf(min);

      console.log({ keys: JSON.stringify(keys), min, index });
      mstSet.unshift(index);
      keys[index] = 1000000;

      // keys[index] = 100000;

      let i: any;
      for (i in listContext?.order[index] ?? []) {
        // console.log({
        //   thing: parseInt(i) !== index,
        //   i,
        //   index,
        //   mstSet: JSON.stringify(mstSet),
        // });
        if (parseInt(i) !== index) {
          // console.log({
          //   i: parseInt(i),
          //   includes: mstSet.includes(parseInt(i)),
          //   mstSet: JSON.stringify(mstSet),
          // });
          if (mstSet.includes(parseInt(i))) {
            keys[i] = 1000000;
          } else {
            let output: any = listContext?.order[index][i][0];
            console.log({ index, i, output, key: keys[i], dist: output.dist });
            if (keys[i] > output.dist) {
              keys[i] = output.dist;
              // console.log("amongus");
            }
          }
        }
      }
    }

    let prevValue = 0;
    let tempPath: number[][] = [[]];
    let output;
    mstSet.shift();
    console.log({ mstSet });

    for (let i in mstSet) {
      output = listContext?.order[mstSet[i]][prevValue][0];
      console.log({
        order: listContext?.order,
        output,
        prevValue,
        i: listContext?.order[mstSet[i]][prevValue][0].i,
      });
      let crawl = output.dest;
      tempPath.push(crawl);

      while (output.pred[crawl[0]][crawl[1]][0] !== -1) {
        tempPath.push(output.pred[crawl[0]][crawl[1]]);
        crawl = output.pred[crawl[0]][crawl[1]];
      }

      prevValue = mstSet[i];
    }
    tempPath.pop();
    changePath(tempPath);
  }, [listContext]);

  return (
    // <div className="UserCanvas" data-testid="UserCanvas">
    <div>
      <h1>Store Map</h1>
      <canvas ref={canvasRef} width="686" height="686" />
    </div>
  );
};

export default UserCanvas;
