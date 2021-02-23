import React, {useContext} from "react"
import StripeCheckout from "react-stripe-checkout"
import axios from "axios"
import {cartContext} from "../../Global/cartContext"

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const Cart = (props) => {
 
    const {dispatch, shoppingCart, totalPrice, qty} = useContext(cartContext);
        //  console.log("total qty: ",qty);
        //  console.log("total price: ",totalPrice);
        
    const handleToken = async (token) => {

        const product = {name: 'All Products', price: totalPrice}
          const response = await axios.post('https://w7gqb.sse.codesandbox.io/checkout', {
              token,
              product
          });
          const {status} = response.data;
          if(status === 'success'){
             
              dispatch({type: 'EMPTY'});
              props.history.push(`/`)
              toast.success("You have paid successfully now you can continue your shopping!", {
                position: toast.POSITION.TOP_RIGHT
              });

          } else {
           
          }

    }
   
    return(
       <div className="cartContainer">
       <div className="cartDetails">
           {shoppingCart.length > 0 ?
            shoppingCart.map(product => (
       <div className="cart" key={product.id}>
        <span className="cartProImage"><img src={product.image_src} alt=""/>
           <span className="imageCount">{product.qty}</span>
        </span>
        <span className="cartProductName">{product.name}</span>
        <div className="mpcart">
        <span className="cartProductPrice">${product.price}</span>
        <span className="inc" onClick={() => dispatch({type: 'INC', id:product.id})}><i className="fas fa-plus"></i></span>
        <span className="productQuantity">{product.qty}</span>
        <span className="dec" onClick={() => dispatch({type: 'DEC', id: product.id})}><i className="fas fa-minus"></i></span>
        <span className="productTotalPrice">${product.qty * product.price}</span>
        <button onClick={() => {if(window.confirm('Are you sure to Remove this Product From Cart?')){ dispatch({type: 'DELETE_PRODUCT', id: product.id})};}} className="deleteCartPro"><i className="fas fa-trash-alt"></i></button>
          </div> </div>  
        )) : 'Yourr Cart is currently empty!'}
        
        </div>
        {shoppingCart.length ? <div className="cartSummary">
            <div className="summary">
                <h3>Order Summary</h3>
                <div className="totalItems">
                    <div className="items">Total Items</div>
               <div className="itemsCount">{qty}.00</div>
                </div>
                <div className="totalPriceSection">
                 <div className="justTitle">Total Price</div>
        <div className="itemsPrice">${totalPrice}</div>
                </div>
       <div className="stripSection">
       <StripeCheckout
       stripeKey="pk_test_HnF0cQhq9UGw2GvWRltNiAQM00kn9HlRCg"
       token={handleToken}
       billingAddress
       shippingAddress
       amount = {totalPrice * 100}
       name="all products in the cart"
       />
       </div>
       </div></div>
        : ''}
                    
</div>
    )
}

export default Cart;