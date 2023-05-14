import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import "./App.css";
import { useEffect } from "react";

interface IForm {
  age: number;
  name: string;
}

const App = () => {
  const defaultValues = {
    age: 22,
  };

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
  } = useForm<IForm>({ defaultValues });

  console.log("errors:", errors);

  const submitHandler: SubmitHandler<IForm> = (data) => {
    console.log("data", data);
  };

  const errorHandler: SubmitErrorHandler<IForm> = (submitErrors) => {
    console.log("Submit with errors", submitErrors);
  };

  const resetHandler = () => reset({ age: 10, name: "tempName" });

  const setNameHandler = () => setValue("name", "nameFromSetValue");

  const validateName = (name: string) => {
    console.log("validate name:", name);

    return true;
  };

  return (
    <div className="container">
      <h1>Hello, Vite + TypeScript + React + ESLint + Prettier!</h1>
      <form onSubmit={handleSubmit(submitHandler, errorHandler)}>
        <input type="text" {...register("name", { required: true, validate: validateName })} />
        <input type="number" {...register("age")} />
        <button type="submit">Send</button>
        <button type="button" onClick={resetHandler}>
          Reset
        </button>
        <button type="button" onClick={setNameHandler}>
          Set Name
        </button>
      </form>
      <div>Текущее имя: {watch("name")}</div>
    </div>
  );
};

export default App;
