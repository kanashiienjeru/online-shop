import { useEffect, useState } from "react";
import styles from "./App.module.scss";
// components
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Catalog from "./components/Catalog/Catalog";
import ProductPage from "./components/ProductPage/ProductPage";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import HeaderMobile from "./components/Header/HeaderMobile";
import FooterMobile from "./components/Footer/FooterMobile";

function App() {

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
   const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  return (
    <div className={styles.App}>
      <header>
        {width > 680 ? (<Header />) : (<HeaderMobile />)}
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog width={width}/>} />
          <Route path="/catalog/:id" element={<ProductPage width={width}/>} />
          <Route path="/cart" element={<Cart width={width}/>} />
        </Routes>
      </main>
      <footer>
        {width > 680 ? (<Footer />) : (<FooterMobile />)}
      </footer>
    </div>
  );
}

export default App;
