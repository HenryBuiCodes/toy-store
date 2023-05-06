import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from "./screnes/checkout/Checkout";
import Confirmation from "./screnes/checkout/Confirmation";
import CartMenu from "./screnes/global/CartMenu";
import Footer from "./screnes/global/Footer";
import Navbar from "./screnes/global/Navbar";
import Home from "./screnes/home/Home";
import ItemDetails from "./screnes/itemDetails/itemDetails";
import Login from "./screnes/authPage/Login";
import Register from "./screnes/authPage/Register";
import NotFoundPage from "./screnes/NotFoundPage";
import AuthProvider from "./components/AuthProvider";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="item/:itemId" element={<ItemDetails />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="checkout/success" element={<Confirmation />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
