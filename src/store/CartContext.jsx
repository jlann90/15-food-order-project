import { createContext } from "react";

// CREATE CONTEXT FOR SPREADING DATA TO OUR COMPONENTS - WILL NEED TO REFERENCE OUR ITEMS AND ALSO ADD AND REMOVE THEM
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

// CREATE OUR REDUCER FOR STATE MANAGEMENT
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    // CREATE A CONSTANT THAT CHECKS IF THE ITEM ALREADY EXISTS IN THE ITEMS ARRARY
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    // CREATE A NEW INSTANCE OF THE ITEMS ARRAY SO WE DONT MUTATE THE ORIGINAL ONE IN MEMORY
    const updatedItems = [...state.items];

    // CHECKS IF THE ITEM HAS AN INDEX (BASICALLY IF IT EXISTS) - IF SO UPDATE THE QUANTITY
    if (existingCartItemIndex > -1) {
      //CREATE A CONSTANT REPRESENTING AN EXISTING ITEM
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

    // RETURNS THE UPDATED STATE FOR THE "ADD_ITEM" TYPE
    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
  }

  return state;
}

//CREATE CONTEXT FOR WRAPPING OUR COMPONENTS THAT WILL NEED TO USE OUR CREATED CONTEXT VALUES ABOVE
export function CartContextProvider({ children }) {
  // USING USEREDUCER RATHER THAN USESTATE BECAUSE ITS BETTER FOR MORE COMPLEX STATE MANAGEMENT, AND EASIER TO MOVE STATE MANAGEMENT OUT OF THE COMPONENT FUNCTION
  // WE CALL OUR REDUCER AS ONE ARGUMENT AND THE OBJECT SHAPE AS THE OTHER - SO WE'RE REFERENCIGN OUR CART CONTEXT SHAPE IN THAT SECOND ARGUMENT
  useReducer(cartReducer, { items: [] });
  // ULTIMATELY WHAT WE ARE RETURNING IS A CART CONTEXT WRAPPER TO GO AROUND COMPONENTS THAT NEED THIS CONTEXT
  return <CartContext.Provider>{children}</CartContext.Provider>;
}

// MAKE SURE TO EXPORT BOTH THE CONTEXT PROVIDER ABOVE AND THE CONTEXT
export default CartContext;
