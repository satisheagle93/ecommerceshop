import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import './App.css';
import Navbars from "./components/Utilities/Navbars"
import Products from "./components/storelinks/Products"
import Cart from "./components/storelinks/Cart"
import ProductContextProvider from "./Global/productContext"
import CartContextProvider from "./Global/cartContext"
import NotFound from "./components/Utilities/NotFound"
import Aboutus from "./components/storelinks/Aboutus"
import Ourstore from './components/storelinks/Ourstore'
import Contactus from './components/storelinks/Contactus'
function App() {
  
  const productsstore=[];
  productsstore.push(Products);
  localStorage.setItem(productsstore, 'productsstore') 

  return (
    <div>
      <ProductContextProvider>
      <CartContextProvider>
      <Router>
      <Navbars />
        <Switch>
          <Route path="/" exact component={Products} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/Aboutus" exact component={Aboutus} />
          <Route path="/Ourstore" exact component={Ourstore} />
          <Route path="/Contactus" exact component={Contactus} />
          <Route component={NotFound}/>
          
        </Switch>
      </Router>
      </CartContextProvider>
      </ProductContextProvider>  
    </div>
  );
}

export default App;
