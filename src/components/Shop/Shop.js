import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart , setCart] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([])

    useEffect(()=>{
        fetch('./products.JSON')
        .then(res=>res.json())
        .then(data=>{
            setProducts(data);
            setDisplayProducts(data);
        });
    },[]);

    useEffect(()=>{
        if(products.length){
            const savedCart = getStoredCart();
            const storedCart = [];
            for(const key in savedCart){
                const addedProduct = products.find( product => product.key === key);
                // console.log(addedProduct);
                if(addedProduct){
                    const quantity = savedCart[key];
                    addedProduct.quantity = quantity;
                    // console.log('added quantity',addedProduct.quantity);
                    storedCart.push(addedProduct);
                }
            }
            setCart(storedCart);
        }
    }, [products]);

    const handleAddToCart = (product) =>{
        const newCart = [...cart, product];
        setCart(newCart);
        //save to local storage
        addToDb(product.key);
    }

    const handleSearch = event =>{
        const seachText = event.target.value;
        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(seachText.toLowerCase()));
        console.log(matchedProducts.length);
        setDisplayProducts(matchedProducts);
    }

    return (
        <div>
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search Product"
                    onChange= {handleSearch}
                />
            </div>
            <div className='shop-container'>
                <div className="product-container">
                    {
                        displayProducts.map(product => <Product 
                            key={product.key}
                            product={product}
                            hero
                            handleAddToCart = {handleAddToCart}
                            
                        />)
                    }
                </div>
                <div className="cart-container">
                <Cart cart={cart}/>
                </div>
            </div>
        </div>   
    );
};

export default Shop;