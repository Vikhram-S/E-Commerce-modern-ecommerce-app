import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../types';
import { CartService } from '../services/CartService';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const cartService = CartService.getInstance();

  useEffect(() => {
    const loadCart = () => {
      try {
        const cartItems = cartService.getCartItems();
        setItems(cartItems);
      } catch (error) {
        console.error('Failed to load cart:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, [cartService]);

  const addToCart = (product: Product, quantity: number = 1) => {
    const updatedItems = cartService.addToCart(product, quantity);
    setItems(updatedItems);
  };

  const removeFromCart = (productId: string) => {
    const updatedItems = cartService.removeFromCart(productId);
    setItems(updatedItems);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const updatedItems = cartService.updateQuantity(productId, quantity);
    setItems(updatedItems);
  };

  const clearCart = () => {
    cartService.clearCart();
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      total,
      itemCount,
      isLoading
    }}>
      {children}
    </CartContext.Provider>
  );
};