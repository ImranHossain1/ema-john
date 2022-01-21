import React from 'react';
import './Cart.css';
const Cart = (props) => {
    const {cart} = props;
    console.log(props);
    //console.log(cart);
    /* const totalReducer = (previous, product) =>{
        previous + product.price;
    } ;
    const total = cart.reduce(totalReducer, 0 ) */
    let totalQuantity = 0;
    let total = 0;
    for(const product of cart){
        if(!product.quantity){
            product.quantity = 1;
        }         
        else{
            total = total+ product.price * product.quantity;
           // console.log("Total:",totalQuantity);
            //console.log("Product.quantity:",product.quantity);
            //console.log(product);
            totalQuantity = totalQuantity + product.quantity; // logical error
            //product.quantity = 1;
        }
    }
    const shipping = total > 0 ? 15: 0;
    const tax= (total + shipping) *0.10;
    const grandTotal = total+tax+shipping;

    return (
        <div>
             <h3>Order Summary</h3>
             <h5>Items Order: {totalQuantity}</h5>
             <p>Total: {total.toFixed(2)}</p>
             <p>Shipping: {shipping}</p>
             <p>tax: {tax.toFixed(2)}</p>
             <p>Grand Total: {grandTotal.toFixed(2)}</p>
             {props.children}
        </div>
    );
};

export default Cart;