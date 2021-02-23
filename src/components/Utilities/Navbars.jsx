import React, {useContext} from "react"
import {cartContext} from "../../Global/cartContext"
import {Link, NavLink} from "react-router-dom"
import shoptrade from "../../assets/shoptrade.png"
// import Message from '../../components/Utilities/Message'

const Navbars = ({cartToggle}) => {
    const [btns, setBtns] = React.useState(false);
 
    const handleBtns=()=>{
        setBtns(!btns)
        
    }
    const closeside=()=>{
        setBtns(false)
    }

   const {shoppingCart} = useContext(cartContext);
    return(
        <nav>
 <ul className="left">
 <li><Link to="/"><img style={{marginTop:'10px',height:'50px'}} src={shoptrade} alt="Logo" /></Link></li>

 </ul>
 <ul className="navlist ">
    
     <li><NavLink to="/" activeClassName="active" exact={true} >Shop</NavLink></li>
     <li><NavLink to="/Aboutus" activeClassName="active">About Us</NavLink></li>
     <li><NavLink to="/Ourstore" activeClassName="active">Our Stores</NavLink></li>
     <li><NavLink to="/Contactus" activeClassName="active">Contact Us</NavLink></li>
 </ul>

<div className="DrawerToggle" onClick={handleBtns}>
        <div></div>
        <div></div>
        <div></div>
    </div>

{btns ?
<>
    <div class="Backdrop" onClick={handleBtns}></div>
 <ul className=" SideDrawer Sdul">

 <li><NavLink to="/" activeClassName="active" exact={true} onClick={closeside} >Shop</NavLink></li>
     <li><NavLink to="/Aboutus" onClick={closeside} activeClassName="active">About Us</NavLink></li>
     <li><NavLink to="/Ourstore" onClick={closeside} activeClassName="active">Our Stores</NavLink></li>
     <li><NavLink to="/Contactus" onClick={closeside} activeClassName="active">Contact Us</NavLink></li>
 </ul>
 </>
:null}



 <ul className="right">
 <li><Link to="">Search <span ><i className="fas fa-search"></i></span></Link></li>
 <li><Link to=""><span ><i className="fas fa-user"></i></span></Link></li>
    <li onClick={cartToggle}>
        <Link to="/cart"><span className="dollor"><i className="fas fa-cart-plus"></i></span>
        <span className="shoppingCartTotal">{shoppingCart ? shoppingCart.length : 0}</span>
        {/* { shoppingCart.length>0 ?  <Message type='success' message='Added to Cart'/>:null} */}
        </Link></li>
 </ul>
</nav>
    )

}

export default Navbars;