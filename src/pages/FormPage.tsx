import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { StateOption, stateOptions } from "../data";

interface IForm {
  age: number;
  name: string;
}

const FormPage = () => {
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

  const filterColors = (inputValue: string) => {
    return stateOptions.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const promiseOptions = (inputValue: string) =>
    new Promise<StateOption[]>((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 1000);
    });

  const getCountries = (inputValue: string) => {
    return axios.get(`https://restcountries.com/v3.1/name/${inputValue}`).then((res) => {
      console.log(res);
      const options = res.data.map((el: any) => ({ label: el.translations.rus.common, value: el.name.common }));
      console.log(options);
      return options;
    });
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
      <div>Current name: {watch("name")}</div>

      <h2>AsyncSelect demo</h2>
      <h3>States (timeout)</h3>
      <AsyncSelect isMulti cacheOptions defaultOptions loadOptions={promiseOptions} />

      <h3>Countries (axios)</h3>
      <AsyncSelect
        isMulti
        cacheOptions
        loadOptions={getCountries}
        placeholder="Start typing"
        noOptionsMessage={({ inputValue }) => (inputValue ? "No opt 1" : "No opt 0")}
      />
    </div>
  );
};

export default FormPage;
