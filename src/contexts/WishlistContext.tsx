import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WishlistItem, Product } from '../types';
import { WishlistService } from '../services/WishlistService';

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const wishlistService = WishlistService.getInstance();

  useEffect(() => {
    const loadWishlist = () => {
      try {
        const wishlistItems = wishlistService.getWishlistItems();
        setItems(wishlistItems);
      } catch (error) {
        console.error('Failed to load wishlist:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWishlist();
  }, [wishlistService]);

  const addToWishlist = (product: Product) => {
    const updatedItems = wishlistService.addToWishlist(product);
    setItems(updatedItems);
  };

  const removeFromWishlist = (productId: string) => {
    const updatedItems = wishlistService.removeFromWishlist(productId);
    setItems(updatedItems);
  };

  const isInWishlist = (productId: string) => {
    return wishlistService.isInWishlist(productId);
  };

  const clearWishlist = () => {
    wishlistService.clearWishlist();
    setItems([]);
  };

  return (
    <WishlistContext.Provider value={{
      items,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
      isLoading
    }}>
      {children}
    </WishlistContext.Provider>
  );
};