import Button from "./UI/Button.jsx";
import logoImg from "../assets/logo.jpg";
import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";

export default function Header() {
  const cartCtx = useContext(CartContext);
  //REDUCE STARTS AT 0 (THE VALUE WE PROVIDED BELOW) AND ADDS THE RETURN FOR EACH ITEM IN AN ARRAY  - HERE WE ARE ADDING THE QUANTITY OF EACH ITEM IN THE ARRAY
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}
