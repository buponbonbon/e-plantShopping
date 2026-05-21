import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../store/CartSlice';

function CartItem() {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const calculateTotalCost = (item) => {
    return item.cost * item.quantity;
  };

  return (
    <div className="cart-container">
      {cart.map(item => (
        <div key={item.name} className="cart-item">
          <img src={item.image} alt={item.name} width="50px" />
          <span>{item.name} - ${item.cost}</span>
          <button onClick={() => handleDecrement(item)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => handleIncrement(item)}>+</button>
          <span>Total: ${calculateTotalCost(item)}</span>
          <button onClick={() => dispatch(removeItem(item.name))}>Delete</button>
        </div>
      ))}
    </div>
  );
}
export default CartItem;