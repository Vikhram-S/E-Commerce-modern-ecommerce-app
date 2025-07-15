import { WishlistItem, Product } from '../types';

export class WishlistService {
  private static instance: WishlistService;
  private storageKey = 'ecommerce-wishlist';

  static getInstance(): WishlistService {
    if (!WishlistService.instance) {
      WishlistService.instance = new WishlistService();
    }
    return WishlistService.instance;
  }

  getWishlistItems(): WishlistItem[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
      return [];
    }
  }

  addToWishlist(product: Product): WishlistItem[] {
    const items = this.getWishlistItems();
    const existingItem = items.find(item => item.product.id === product.id);

    if (!existingItem) {
      items.push({
        id: `wishlist-${product.id}`,
        product,
        addedAt: new Date()
      });
      this.saveWishlist(items);
    }

    return items;
  }

  removeFromWishlist(productId: string): WishlistItem[] {
    const items = this.getWishlistItems().filter(item => item.product.id !== productId);
    this.saveWishlist(items);
    return items;
  }

  isInWishlist(productId: string): boolean {
    return this.getWishlistItems().some(item => item.product.id === productId);
  }

  clearWishlist(): void {
    localStorage.removeItem(this.storageKey);
  }

  private saveWishlist(items: WishlistItem[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }
}