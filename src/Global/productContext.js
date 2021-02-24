import React, {createContext, useReducer} from "react"
import {ProductReducer} from "./productReducer"

import pdata from '../products.json';
export const productContext = createContext();


const ProductContextProvider = (props) => {
    
    
// console.log(pdata);
    const [products] = useReducer(ProductReducer,pdata)
    
    return(
        <productContext.Provider value={{products}}>
           {props.children}
        </productContext.Provider>
    )

}

export default ProductContextProvider;