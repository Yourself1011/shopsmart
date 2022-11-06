import { createContext } from "react";

export interface ListContextInterface {
  list: string[];
  changeList: any;
  order: any[][];
  changeOrder: any;
}

const ListCtx = createContext<ListContextInterface | null>(null);

export { ListCtx };
