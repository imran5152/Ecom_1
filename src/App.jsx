
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Category from "./pages/Category";
import Login from "./authe/login";
import Register from "./authe/register";
import AdminDashboard from "./authe/Admindashboard";
import AddProducts from "./Admin/Products/AddProducts";
import ProductManagement from "./Admin/Products/ProductManagement";
import ListProducts from "./Admin/Products/ProductList";



export default function App() {
  return (
    <>
     
      <Navbar />

        
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/products" element={<Products/>}>
        </Route>
        <Route path="/category" element={<Category/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register"element={<Register/>}/>
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
        <Route path="/admin/products" element={<AddProducts/>}/>
        <Route path="/admin/productlist" element={<ListProducts/>} />
        <Route path="/admin/productmanagement" element={<ProductManagement/>}/>
      </Routes>
    </>
  );
}
