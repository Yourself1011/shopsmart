import React, { FC, useContext, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import "./ListForm.scss";
import { ListCtx } from "../ListContext/ListContext";
import shop from "../../shop.json";

interface ListFormProps {}

const twoDIndexOf = (item: any, array: any[]) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === item) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
};

const ListForm: FC<ListFormProps> = () => {
  const listContext = useContext(ListCtx);
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit((data) => {
    listContext?.changeList(
      data.list.split(", ").map((x: string) => x.toLowerCase())
    );
  });
  const adjacencyMatrix = useRef<any[]>(shop.grid.map((x) => x.slice()));

  useEffect(() => {
    let temp: any[];
    for (let row = 0; row < 13; row++) {
      for (let column = 0; column < 13; column++) {
        if (!shop.grid[row][column]) {
          temp = [];
          if (row < 12 && shop.grid[row + 1][column] !== 1) {
            temp.push([row + 1, column]);
          }
          if (column < 12 && shop.grid[row][column + 1] !== 1) {
            temp.push([row, column + 1]);
          }
          if (row > 0 && shop.grid[row - 1][column] !== 1) {
            temp.push([row - 1, column]);
          }
          if (column > 0 && shop.grid[row][column - 1] !== 1) {
            temp.push([row, column - 1]);
          }
          adjacencyMatrix.current[row][column] = temp;
        }
      }
    }
    console.log(adjacencyMatrix);
  }, []);

  useEffect(() => {
    if (!listContext?.list.length) {
      return;
    }

    const BFS = (dest: number[], src: number[]) => {
      let queue: number[][];
      let visited: boolean[][];
      let dist: number[][];
      let pred: number[][][];
      let v!: number[];

      queue = [];
      visited = [];
      dist = [];
      pred = [];
      v = [];

      for (let i in shop.grid) {
        visited.push([]);
        dist.push([]);
        pred.push([]);
        for (let j in shop.grid[i]) {
          visited[i][j] = false;
          dist[i][j] = 1000000;
          pred[i][j] = [-1, -1];
        }
      }

      if (shop.grid[src[0]][src[1]] > 1) {
        if (typeof adjacencyMatrix.current[src[0] + 1][src[1]] !== "number") {
          src = [src[0] + 1, src[1]];
        } else if (
          typeof adjacencyMatrix.current[src[0] - 1][src[1]] !== "number"
        ) {
          src = [src[0] - 1, src[1]];
        }
      }

      console.log(src);

      visited[src[0]][src[1]] = true;
      dist[src[0]][src[1]] = 0;
      queue.push(src);

      while (queue.length !== 0) {
        v = queue.shift() ?? [];

        let adj = adjacencyMatrix.current[v[0]][v[1]];
        if (typeof adj !== "number") {
          for (let i of adj) {
            // if (i === undefined) console.log(i);
            if (!visited[i[0]][i[1]]) {
              visited[i[0]][i[1]] = true;
              dist[i[0]][i[1]] = dist[v[0]][v[1]] + 1;
              pred[i[0]][i[1]] = v;
              queue.push([i[0], i[1]]);

              if (i[0] === dest[0] && i[1] === dest[1]) {
                return { status: true, dist, pred, path: pred[i[0]][i[1]], i };
              }
            }
          }
        }
      }

      return { status: false, dist, pred, path: undefined };
    };

    let coords = listContext?.list.map((x) =>
      twoDIndexOf(shop.items.indexOf(x), shop.grid)
    );
    coords?.push([0, 0]);

    // console.log(BFS([8, 10], [0, 0]));

    let order: any[][] = [];
    let output;
    for (let src in coords ?? []) {
      order.push([]);
      for (let dest in coords ?? []) {
        order[src].push([]);
        output = BFS(coords?.[dest] ?? [0, 0], coords?.[src] ?? [0, 0]);
        if (output.i === undefined) console.log(output);

        order[src][dest].push({
          src: coords?.[src],
          dest: coords?.[dest],
          srcIndex: src,
          destIndex: dest,
          dist: output.dist[coords?.[dest][0] ?? 0][coords?.[dest][1] ?? 0],
          num: shop.grid[coords?.[dest][0] ?? 0][coords?.[dest][1] ?? 0],
          pred: output.pred,
          path: output.path,
          i: output.i,
        });
      }
    }

    listContext?.changeOrder(order);
  }, [listContext?.list]);

  return (
    <>
    <h1>
      Enter your shopping list
    </h1>
    <div className="ListForm" data-testid="ListForm">
      {/* <div>
        Order:{" "}
        {listContext?.order[0] ? listContext?.order.map((x) => `${x}, `) : "Nothing yet!"}
      </div> */}
      <form onSubmit={onSubmit}>
        <textarea
          {...register("list")}
          placeholder="Avocado, mangoes, oranges, nectarines, granola, umbrellas, saffron"
        />
        <br />
        <input type="submit" />
      </form>
    </div>
    </>
  );
};

export default ListForm;
