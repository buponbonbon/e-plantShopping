import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/CartSlice';
import './ProductList.css';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const plantsArray = [
    { category: "Indoor", name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482858706-9467657d4766", cost: 20 },
    { category: "Outdoor", name: "Lavender", image: "https://images.unsplash.com/photo-1611899938871-4775d7100780", cost: 15 },
    { category: "Succulents", name: "Aloe Vera", image: "https://images.unsplash.com/photo-1532781914607-2031eca2f00d", cost: 10 }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div className="product-list">
      {plantsArray.map((plant, index) => (
        <div key={index} className="product-card">
          <img src={plant.image} alt={plant.name} style={{width: '200px'}} />
          <h3>{plant.name}</h3>
          <p>${plant.cost}</p>
          <button 
            onClick={() => handleAddToCart(plant)}
            disabled={cartItems.some(item => item.name === plant.name)}
          >
            {cartItems.some(item => item.name === plant.name) ? "Added" : "Add to Cart"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;