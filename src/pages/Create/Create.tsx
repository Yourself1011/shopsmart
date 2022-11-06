import React, { FC } from "react";
import "./Create.scss";
import Canvas from "../../components/Canvas/Canvas";

interface CreateProps {}

const Create: FC<CreateProps> = () => (
  <div className="Create">
    <Canvas />
  </div>
);

export default Create;
