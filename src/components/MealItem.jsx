import { currencyFormatter } from "../util/formatting.js";

// WE PASS IN MEAL AS A PROP WHICH IS BRINGING IN ALL OF THE MEALS DATA, SINCE WE MAP THE LOADED MEAL IN THE MEALS COMPONENT
export default function MealItem({ meal }) {
  return (
    <li className="meal-item">
      <article>
        {/* LOOKING AT THE AVAILABLE-MEALS IN JSON, ONLY PART OF THE URL IS PROVIDED - SO WE ADD THE MISSING PIECE COMBINED WITH THE OBJECT VARIABLE */}
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <button>Add to Cart</button>
        </p>
      </article>
    </li>
  );
}
