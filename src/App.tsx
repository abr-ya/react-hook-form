import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import "./App.css";

interface IForm {
  age: number;
  name: string;
}

const App = () => {
  const defaultValues = {
    age: 22,
  };

  const { register, handleSubmit } = useForm<IForm>({ defaultValues });

  const submitHandler: SubmitHandler<IForm> = (data) => {
    console.log("data", data);
  };

  const errorHandler: SubmitErrorHandler<IForm> = (errors) => {
    console.log("errors", errors);
  };

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
      </form>
    </div>
  );
};

export default App;
