import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon.styles";

const CartIcon = () => {
  const { setIsCartOpen, cartCount } = useContext(CartContext);

  const toogleIsCartOpen = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <CartIconContainer onClick={toogleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
