import {  toast } from 'react-toastify';
export const CartReducer = (state, action) => {
    let {shoppingCart, totalPrice, qty, size} = state;
    let product;
    let index;
    let updatedPrice;
    let updatedQty;
    let psize;
    
    switch(action.type){
        case 'ADD_TO_CART': 
        const check = shoppingCart.find(cart => cart.id === action.id);
       
        if(check){
            // return state;
            return {shoppingCart: [...shoppingCart], totalPrice, message: 'add', qty,size:size};
        } else {
            product = action.products.find(product  => product.id === action.id);
            // psize=action.size;
            //  console.log('ps',psize)
            product['qty'] = 1;
            updatedQty = qty + 1;
            updatedPrice = totalPrice + product.price * product.qty;
            toast.success(action.message, {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 1500
              })
            
           return {shoppingCart: [product,...shoppingCart], totalPrice: updatedPrice, message: 'added successfully', qty: updatedQty, size:psize
         };
        }
      
        case 'DELETE_PRODUCT':
            const filtered = shoppingCart.filter(cart => cart.id !== action.id);
           
            product = shoppingCart.find(cart => cart.id === action.id);
            // setAllPrice(allPrice - product.price * product.qty);
            updatedPrice = totalPrice - product.price * product.qty;
            updatedQty = qty - product.qty;
            return {shoppingCart: [...filtered], totalPrice: updatedPrice, message: '', qty: updatedQty,size:size}
        
        
        case 'INC':
            console.log('Inc run');
            product = shoppingCart.find(product => product.id === action.id);
            index = shoppingCart.findIndex(product => product.id === action.id);
            product.qty = product.qty + 1;
            updatedQty = qty + 1;
            updatedPrice = parseInt(totalPrice) + parseInt(product.price);
            // totalPrice = totalPrice + product.price;
            console.log('total' ,parseInt(totalPrice));
            console.log('price' ,product.price);
            shoppingCart[index] = product;
            return {shoppingCart: [...shoppingCart], totalPrice: updatedPrice, message: '', qty: updatedQty,size:size}
        

        case 'DEC': 
        product = shoppingCart.find(product => product.id === action.id);
        index = shoppingCart.findIndex(product => product.id === action.id);
       if(product.qty > 1){
           console.log('Yes graer');
       product.qty = product.qty - 1;
       updatedPrice = totalPrice - product.price;
       updatedQty = qty - 1;
       shoppingCart[index] = product;
       console.log("afer dec",shoppingCart);
       return {shoppingCart: [...shoppingCart], totalPrice: updatedPrice, message: '', qty: updatedQty,size:size};
       } else {
           return {shoppingCart: [...shoppingCart], totalPrice: totalPrice, message: '', qty: qty,size:size}
       }
       


       case 'EMPTY':
        return {shoppingCart: [], totalPrice: 0, message: '', qty: 0, size:0}
       
    default: 
    return state;

    }
    

}