import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Checkout from "./screnes/checkout/Checkout";
import Confirmation from "./screnes/checkout/Confirmation";
import CartMenu from "./screnes/global/CartMenu";
import Footer from "./screnes/global/Footer";
import Navbar from "./screnes/global/Navbar";
import Home from "./screnes/home/Home";
import ItemDetails from "./screnes/itemDetails/itemDetails";

const ScrolltoTop = () => {
  const { pathName } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathName]);

  return null;
};
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <ScrolltoTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="item/:itemId" element={<ItemDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<Confirmation />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
