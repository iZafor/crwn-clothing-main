import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const foundItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (!foundItem) {
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToAdd.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
  );
};

const removeCartItem = (cartItems, cartItemID) => {
  return cartItems.filter(({ id }) => id !== cartItemID);
};

const reduceQuantity = (cartItems, cartItemID) => {
  const isOnlyOneLeft = cartItems.find(
    ({ id, quantity }) => id === cartItemID && quantity === 1
  );

  if (isOnlyOneLeft) {
    return removeCartItem(cartItems, cartItemID);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemID
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productIdToRemove) => {
    setCartItems(removeCartItem(cartItems, productIdToRemove));
  };

  const reduceQuantityOfCartItem = (productIdToDecrease) => {
    setCartItems(reduceQuantity(cartItems, productIdToDecrease));
  };

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, { quantity }) => total + quantity,
      0
    );

    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, { quantity, price }) => total + quantity * price,
      0
    );

    setCartTotal(newCartTotal);
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    reduceQuantityOfCartItem,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
