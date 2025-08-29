
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Category from "./pages/Category";


export default function App() {
  return (
    <>
     
      <Navbar />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/category" element={<Category/>}/>
      </Routes>
    </>
  );
}
