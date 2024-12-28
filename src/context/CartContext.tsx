import React, { createContext, useContext, useState, ReactNode } from 'react';

// This is what each item in our cart looks like
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// This defines what our cart can do
interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
  totalPrice: number;
}

// We're creating a new context for our cart
const CartContext = createContext<CartContextProps | undefined>(undefined);

// This is the main component that wraps our app and provides cart functionality
export const CartProvider = ({ children }: { children: ReactNode }) => {
  // This is where we store all the items in our cart
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // This function adds a new item to the cart
  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // If the item is already in the cart, we just increase the quantity
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      // If it's a new item, we add it to the cart
      return [...prevItems, item];
    });
  };

  // This function removes an item from the cart
  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // This function updates the quantity of an item in the cart
  const updateCartItemQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      quantity === 0
        ? prevItems.filter((item) => item.id !== id) // If quantity is zero, we remove the item
        : prevItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
    );
  };

  // This calculates the total price of everything in the cart
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // We're providing all these functions and data to the rest of our app
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// This is a handy hook that lets other components easily use our cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
