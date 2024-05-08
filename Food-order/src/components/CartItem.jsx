import { useContext } from "react";
import CartContext from "../store/cartContext";

export default function CartItem({ item }) {
  const cartCtx = useContext(CartContext);

  function handleAddItem() {
    cartCtx.addItem(item);
  }
  function handleRemoveItem() {
    cartCtx.removeItem(item.id);
  }

  return (
    <li className="cart-item">
      <p>
        {item.name} - {item.quantity} * {item.price}
      </p>
      <p className="cart-item-actions">
        <button onClick={handleRemoveItem}>-</button>
        <span>{item.quantity}</span>
        <button onClick={handleAddItem}>+</button>
      </p>
    </li>
  );
}
