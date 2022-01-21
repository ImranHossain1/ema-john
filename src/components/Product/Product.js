import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import Rating from 'react-rating';

const Product = (props) => {
    //console.log(props.hero);
    const {name, price, img, stock, seller, star}= props.product;
    //const cartIcon = <FontAwesomeIcon icon={faShoppingCart} />
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className='product-name'>{name}</h4>
                <p>by: {seller}</p>
                <p>Price: {price}</p>
                <p><small>Only {stock} left in stock - order soon</small></p>
                <Rating 
                    emptySymbol="far fa-star"
                    fullSymbol="fas fa-star"
                    initialRating={star}
                    readonly
                > </Rating><br />
                <button 
                    className='btn-regular'
                    onClick={()=>props.handleAddToCart(props.product)}
                 ><FontAwesomeIcon icon={faShoppingCart}/> Add to cart</button>
            </div>
        </div>
    );
};

export default Product;