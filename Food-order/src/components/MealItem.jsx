import { useContext } from "react";
import { currencyFormatter } from "../utils/CurrencyFormatter";
import Button from "./UI/Button";
import CartContext from "../store/cartContext";

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  function handleAddMealtoCart() {
    cartCtx.addItem(meal);
  }
  
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-description">{meal.description}</p>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
        </div>
        <div>
          <p className="meal-item-actions">
            <Button onClick={handleAddMealtoCart}>Add to Cart</Button>
          </p>
        </div>
      </article>
    </li>
  );
}
