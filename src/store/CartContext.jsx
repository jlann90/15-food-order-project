import { createContext, useReducer } from "react";

// CREATE CONTEXT FOR SPREADING DATA TO OUR COMPONENTS - WILL NEED TO REFERENCE OUR ITEMS AND ALSO ADD AND REMOVE THEM
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

// CREATE OUR REDUCER FOR STATE MANAGEMENT
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    // CREATE A CONSTANT THAT GETS THE CART ITEM INDEX (ITS PLACEMENT IN THE ARRAY) - ALLOWS TO EDIT IN IMMUTABLE WAY
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    // CREATE A NEW INSTANCE OF THE ITEMS ARRAY SO WE DONT MUTATE THE ORIGINAL ONE IN MEMORY
    const updatedItems = [...state.items];

    // CHECKS IF THE ITEM HAS AN INDEX (BASICALLY IF IT EXISTS) - IF SO UPDATE THE QUANTITY
    if (existingCartItemIndex > -1) {
      //CREATE A CONSTANT REPRESENTING AN EXISTING ITEM'S VALUE (THE ITEM OBJECT AND ALL OF ITS PROPERTIES)
      const existingItem = state.items[existingCartItemIndex];
      //CREATE A NEW CONSTANT AND SPREAD THE EXISTING PROPERTIES INTO IT (ID, NAME, PRICE, ETC) BUT ALSO ADD A QUANTITY PROPERTY
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      // UPDATES THE EXISTING ITEM IN THE UPDATEDITEMS CONSTANT OUTSIDE OF THIS CONDITIONAL WITH THE NEW QUANTITY
      updatedItems[existingCartItemIndex] = updatedItem;

      // OTHERWISE ADD THE ITEM INTO THE ARRAY AND GIVE IT A QUANTITY PROPERTY WITH A VALUE OF 1
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    // RETURNS THE UPDATED STATE
    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    // SAME APPROACH FOR GETTING THE CART ITEM INDEX AS ADDING AN ITEM ABOVE - ALLOWS TO EDIT IN IMMUTABLE WAY
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    // CREATE A CONSTANT FOR THE CURRENT ITEM
    const existingCartItem = state.items[existingCartItemIndex];
    // CREATE A COPY OF CURRENT STATE/ITEMS TO WORK WITH
    const updatedItems = [...state.items];

    // CHECKS IF THE ITEM ONLY HAS 1 IN THE CART AND REMOVE IT ENTIRELY IF SO
    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);

      // OTHERWISE IF THE ITEM HAS MORE THAN 1 IN THE CART, REDUCE THE QUANTITY BY 1
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    // RETURNS THE UPDATED STATE
    return { ...state, items: updatedItems };
  }

  return state;
}

//CREATE CONTEXT FOR WRAPPING OUR COMPONENTS THAT WILL NEED TO USE OUR CREATED CONTEXT VALUES ABOVE
export function CartContextProvider({ children }) {
  // USING USEREDUCER RATHER THAN USESTATE BECAUSE ITS BETTER FOR MORE COMPLEX STATE MANAGEMENT, AND EASIER TO MOVE STATE MANAGEMENT OUT OF THE COMPONENT FUNCTION
  // WE CALL OUR REDUCER AS ONE ARGUMENT AND THE OBJECT SHAPE AS THE OTHER - SO WE'RE REFERENCIGN OUR CART CONTEXT SHAPE IN THAT SECOND ARGUMENT
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  // CREATE OUR FUNCTIONS WE DEFINED IN THE REDUCER FOR THE CART CONTEXT
  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }
  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  // CREATE THE CONTEXT TO PASS INTO THE PROVIDER BELOW
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
  };

  console.log(cartContext);

  // ULTIMATELY WHAT WE ARE RETURNING IS A CART CONTEXT WRAPPER TO GO AROUND COMPONENTS THAT NEED THIS CONTEXT
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

// MAKE SURE TO EXPORT BOTH THE CONTEXT PROVIDER ABOVE AND THE CONTEXT
export default CartContext;
