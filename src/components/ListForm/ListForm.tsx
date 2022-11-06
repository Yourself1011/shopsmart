import React, { FC, useContext } from "react";
import { useForm } from "react-hook-form";
import "./ListForm.scss";
import { ListCtx } from "../ListContext/ListContext";
import shop from "../../shop.json"

interface ListFormProps {}

const ListForm: FC<ListFormProps> = () => {
  const listContext = useContext(ListCtx);
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit((data) => {
    listContext?.changeList(data.list);
  });

  return (
    <div className="ListForm" data-testid="ListForm">
      <div>Order:</div>
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
