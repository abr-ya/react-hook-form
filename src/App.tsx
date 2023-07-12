import { Routes, Route } from "react-router-dom";
import "./styles.css";
import MainLayout from "./layout/MainLayout";
import { Food, FormPage, Home, NotFound, Product, Register, SearchPage } from "./pages";
import { FilterProvider } from "./context/FilterContext";

const App = () => {
  return (
    <FilterProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<FormPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="home" element={<Home />} />
          <Route path="product" element={<Food />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </FilterProvider>
  );
};

export default App;
