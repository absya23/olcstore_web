export const SET_CART = "SET_CART";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

const setProductToCart = (cartList, state) => {
  return { ...state, cart: cartList };
};

const addProductToCart = (product, quantity, state) => {
  console.log("adding product", product);
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id_prod === product.id_prod
  );

  if (updatedItemIndex < 0) {
    updatedCart.push({ ...product, quantity });
  } else {
    const updatedItem = {
      ...updatedCart[updatedItemIndex],
    };
    updatedItem.quantity += quantity;
    updatedCart[updatedItemIndex] = updatedItem;
  }

  return { ...state, cart: updatedCart };
};

const removeProductFromCart = (productId, state) => {
  console.log("remove product: " + productId);
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id_prod === productId
  );
  updatedCart.splice(updatedItemIndex, 1);

  return { ...state, cart: updatedCart };
};

const updateQuantityFromCart = (productId, quantity, state) => {
  console.log("update product: " + productId);
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id_prod === productId
  );

  const updatedItem = {
    ...updatedCart[updatedItemIndex],
  };
  updatedItem.quantity = quantity;
  updatedCart[updatedItemIndex] = updatedItem;

  return { ...state, cart: updatedCart };
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case SET_CART:
      return setProductToCart(action.cartList, state);

    case ADD_PRODUCT:
      return addProductToCart(action.product, action.quantity, state);

    case REMOVE_PRODUCT:
      return removeProductFromCart(action.productId, state);

    case UPDATE_PRODUCT:
      return updateQuantityFromCart(action.productId, action.quantity, state);

    default:
      return state;
  }
};
