import { useEffect, useState } from "react";
import s from "./home.module.css";
import axios, { isCancel } from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const apiUrl =
      "https://file.notion.so/f/s/42dd248d-d945-4741-a6b5-842b764e855c/data.json?id=24fe6e14-d381-422e-b708-2d318dec345b&table=block&spaceId=05a92a5a-0287-4665-b482-76386649fce0&expirationTimestamp=1688313600000&signature=rLdu3Ure2ENTYRMxQnbXaG9jz2X8JamOeb6gz-ByYdw";
    const cancelTokenSource = axios.CancelToken.source();
    axios
      .get(apiUrl, { cancelToken: cancelTokenSource.token })
      .then((res) => setData(res.data))
      .catch((e) => {
        if (isCancel(e)) {
          console.log("Request canceled, error message: ", e.message);
        } else {
          console.log("Error: ", e.message);
        }
      });

    return () => {
      cancelTokenSource.cancel("Cancel in useEffect Cleaner.");
    };
  }, []);

  return (
    <>
      <h1 className={s.root}>React Typescript Webpack</h1>
      <h2>{`Получено ${data.length} товаров`}</h2>
    </>
  );
};

export default Home;
