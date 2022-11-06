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
  const [orderState, changeOrder] = useState([0]);
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
  }, []);

  useEffect(() => {
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

      visited[0][0] = true;
      dist[0][0] = 0;
      queue.push([0, 0]);

      while (queue.length !== 0) {
        v = queue.shift() ?? [];

        if (typeof adjacencyMatrix.current[v[0]][v[1]] !== "number") {
          for (let i of adjacencyMatrix.current[v[0]][v[1]]) {
            if (!visited[i[0]][i[1]]) {
              visited[i[0]][i[1]] = true;
              dist[i[0]][i[1]] = dist[v[0]][v[1]] + 1;
              pred[i[0]][i[1]] = v;
              queue.push([i[0], i[1]]);

              if (i[0] === dest[0] && i[1] === dest[1]) {
                return { status: true, dist, pred };
              }
            }
          }
        }
      }

      return { status: false, dist, pred };
    };

    let coords = listContext?.list.map((x) =>
      twoDIndexOf(shop.items.indexOf(x), shop.grid)
    );

    // console.log(BFS([8, 10], [0, 0]));

    let order = [];
    let output;
    for (let dest of coords ?? []) {
      output = BFS(dest ?? [0, 0], [0, 0]);
      order.push({
        dest,
        dist: output.dist[dest[0]][dest[1]],
        num: shop.grid[dest[0]][dest[1]],
      });
    }

    order.sort((a, b) => a.dist - b.dist);
    changeOrder(order.map((x) => x.num));
  }, [listContext, adjacencyMatrix]);

  return (
    <div className="ListForm" data-testid="ListForm">
      <div>
        Order:{" "}
        {orderState[0] ? orderState.map((x) => `${x}, `) : "Nothing yet!"}
      </div>
      <form onSubmit={onSubmit}>
        <textarea
          {...register("list")}
          placeholder="Avocado, mangoes, oranges, nectarines, granola, umbrellas, saffron"
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default ListForm;
