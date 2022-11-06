import React, { FC, useContext } from "react";
import { useForm } from "react-hook-form";
import "./ListForm.scss";
import { ListCtx } from "../ListContext/ListContext";

interface ListFormProps {}

const ListForm: FC<ListFormProps> = () => {
  const listContext = useContext(ListCtx);
  const { register, handleSubmit, formState } = useForm();
  const onSubmit = handleSubmit((data) => {
    listContext?.changeList(data.list);
  });

  return (
    <div className="ListForm" data-testid="ListForm">
      <form onSubmit={onSubmit}>
        <textarea
          {...register("list")}
          placeholder="Enter your shopping list, separated by commas"
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default ListForm;
