import { useContext, useEffect, useState } from "react";
import axios, { isCancel } from "axios";
import { IProduct } from "../interfaces";
import FilterContext from "../context/FilterContext";
// import { Card } from "../components";
// import { CardsWrapper } from "../components/Common.styled";
import { createConfig } from "../utls";

const SearchPage = () => {
  const { key } = useContext(FilterContext);

  const [data, setData] = useState<IProduct[]>([]);
  const [filteredData, setFilteredData] = useState<IProduct[]>([]);

  useEffect(() => {
    const apiUrl = "https://api.react-learning.ru/products";
    const cancelTokenSource = axios.CancelToken.source();
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE0M2I5ZGUwYmYyYzUxOWIxNzZhZGYiLCJncm91cCI6Imdyb3VwMTExIiwiaWF0IjoxNjg4NDg0ODY4LCJleHAiOjE3MjAwMjA4Njh9.Z4he7gfXTfSLpZpatx7c5h4a46ifkDoopraZyqhNDu4";
    const config = createConfig(token);

    axios
      .get(apiUrl, { ...config, cancelToken: cancelTokenSource.token })
      .then((res) => {
        console.log(res.data.products);
        setData(res.data.products);
      })
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

  const filterByName = (products: IProduct[], text: string) =>
    products.filter((item) => item.name.toLowerCase().includes(text));

  useEffect(() => {
    if (data && data.length) setFilteredData(key ? filterByName(data, key) : data);
  }, [data, key]);

  return (
    <>
      <h1>{`По запросу ${key} найдено ${filteredData.length} товаров`}</h1>
      {/* <CardsWrapper>
        {filteredData.slice(0, 8).map((el) => (
          <Card key={el._id} {...el} />
        ))}
      </CardsWrapper> */}
    </>
  );
};

export default SearchPage;
