import React, { FC, useState } from "react";
import "./Home.scss";
import UserCanvas from "../../components/UserCanvas/UserCanvas";
import ListForm from "../../components/ListForm/ListForm";
import {
  ListContextInterface,
  ListCtx,
} from "../../components/ListContext/ListContext";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [list, changeList] = useState([]);

  const ctx: ListContextInterface = {
    list: list,
    changeList: changeList,
  };

  return (
    <div className="Home">
      <ListCtx.Provider value={ctx}>
        <UserCanvas />
        <ListForm />
      </ListCtx.Provider>
    </div>
  );
};

export default Home;
