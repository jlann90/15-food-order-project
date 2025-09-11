import { createContext, useState } from "react";

//CONTEXT USED TO REPRESENT THE USERS PROGRESS - INVOLVES SETTING A PROGRESS VALUE FOR STATE AND FUNCTIONS THAT EITHER SET IT TO A SPECIFIC STRING USED TO SET OPEN TO TRUE ON A SPECIFIC MODAL, OR TO SET IT TO FALSE BY SETTING TO AN EMPTY STRING AKA CLEARING IT

const UserProgressContext = createContext({
  progress: "", // 'cart', 'checkout'
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");

  function showCart() {
    setUserProgress("cart");
  }

  function hideCart() {
    setUserProgress("");
  }

  function showCheckout() {
    setUserProgress("checkout");
  }

  function hideCheckout() {
    setUserProgress("");
  }

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
