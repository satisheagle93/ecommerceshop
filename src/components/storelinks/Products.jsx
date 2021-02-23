import React, { useState,useContext } from "react"
import { productContext } from "../../Global/productContext"
import { cartContext } from "../../Global/cartContext"
import Breadcrumb from '../Utilities/Breadcrumb'
import Banner from "../Utilities/Banner"

// import axios from 'axios';
const filterlist  = [
  {Name:"All products",value:"all",brand:""},
  {Name:"Tee Shirt",value:"T-shirt",brand:""},
  {Name:"Denim",value:"Denim",brand:""},
  {Name:"Sweatshirts",value:"sweat",brand:""},
  {Name:"Polo Tee Shirt",value:"T-shirt",brand:"U.S Polo Assn."},
  {Name:"Shirt",value:"shirt",brand:""}
]

const Products = () => {
  const { dispatch } = useContext(cartContext);
   let { products } = useContext(productContext);
   
  const [productDetails,productByType] =useState(products)
  const [activeFilter,setActiveFilter] =useState("All products")
  const [Sort,setSort] = useState('')
  const [Isactive,setIsactive] = useState('')
  const [Isactivesize,setIsactivesize] = useState('')
  const seletsize = (option) => {
    switch (option) {
      case 'xs':
        return '38';
        
      case 'small':
        return '39';
        
      case 'medium':
        return '40';
        
      case 'large':
        return '44';
        
      case 'xl':
        return '46';

        case 'US 8':
          return '38';
          
        case 'US 9':
          return '39';
          
        case 'US 10':
          return '40';
          
        case 'US 11':
          return '44';
          
        case 'US 13':
          return '46';

      default:
        return option;
    }
  }
  const setsize=(id)=>{
    setIsactivesize(id)
  }
  const filerProducts=(type,brand)=>{
    let filterByType =[]
    if (type ==="all" ) {
     productByType(products)
    }
    else if(type === "sweat"){
     filterByType =  products.filter((prod)=>(prod.name === "Men's Pullover Sweatshirt"))
     productByType(filterByType)
    }
   else if (brand) {
     filterByType =  products.filter((prod)=>((prod.tag ===type)&&(prod.vendor === brand)))
     productByType(filterByType)
    }
    else{
     filterByType =  products.filter((prod)=>prod.tag ===type)
     productByType(filterByType)
    }
   }

    
  
  return (
    <div>
      <Banner />
      
      <Breadcrumb/>
      
      <div className="totalproducts">
        <h3>ALL PRODUCTS ({productDetails&&productDetails.length} products)</h3>
  
      </div>
 
      <div className="filterslist">
         <h3 className="title">FILTERS: </h3>
         {filterlist.map((item,i)=>{
            return(
              <button key={i}
              onClick={()=>{
                setActiveFilter(item.Name)
                filerProducts(item.value,item.brand)
              }}
                variant="outlined" 
                size="medium"  
                className={activeFilter===item.Name ? 'active filButton': 'filButton'}
               
                >
                {item.Name}
              </button>
            )
          })}
        
        
            <select value={Sort} className="sortButton pr" onChange={(e)=> setSort(e.target.value)}>
              
                <option value='low to high'>Sort By: Price Low to High</option>
                <option value='high to low'>Sort By: Price High to Low</option>
            </select>
      </div>
        
        
      <hr/>
      <div>
      
      {productDetails&&productDetails.length >=1? 
        <div className="products" >
        {productDetails.sort( Sort==='high to low'? (a, b) => parseFloat(b.price) - parseFloat(a.price) 
            : (a, b) => parseFloat(a.price) - parseFloat(b.price)).map((product) => (
           <div className="product" key={product.id}>
           <div className="pro">
             <div className="productImage">
               <img src={product.image_src} alt={product.name} title={product.name} />
             </div>
             <div className="productDetails">
               <div className="proName">
                 <h3 className="vendor">{product.vendor}</h3>
                 <h5 className="name">{product.name}</h5>
      
               </div>
              
               
               <div className="cartSize">
               {Isactive===product.id?null:
               <h3 className="vendor">{product.vendor}</h3>}
               <div className="psize">
                   <div className="optionname" >Select Size: &nbsp;
               <span>
                      
                       {product.options.map((size,i)=>
                       <button className={Isactivesize===size.id? 'active sizebtn': ' sizebtn'} 
                       key={i} 
                       onClick={()=>{
                        
                        setIsactive(product.id)
                        setsize(size.id)
                        }}>{seletsize(size.value)}</button>)}
                     </span>
                   </div>
      
                 </div>
               
                {Isactive===product.id?
               
                    <button id="add_btn" className="proButton" onClick={() => {dispatch({ type: 'ADD_TO_CART', id: product.id, products })}}>Add To Cart</button>
                :null}
                
               </div>
               {Isactive===product.id?null:
               <div className="proPrice">
                 <span className="newprice" >${product.price}</span>
                 <span className="oldprice" >${product.compare_at_price}</span>
                 <span className="discount" > ({((product.compare_at_price - product.price) / product.compare_at_price * 100).toFixed(0)}% OFF)</span>
               </div>}
             </div>
      
             {product.tag === 'T-shirt' ? <div className="new">New</div> : ''}
             {product.tag === 'jacket' ? <div className="hot">Hot</div> : ''}
           </div>
         </div>
       ))}
       
        </div>
   : null}
     
     </div>
     </div>
  )

}

export default Products;