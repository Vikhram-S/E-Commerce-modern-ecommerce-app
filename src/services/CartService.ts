import { CartItem, Product } from '../types';

export class CartService {
  private static instance: CartService;
  private storageKey = 'ecommerce-cart';

  static getInstance(): CartService {
    if (!CartService.instance) {
      CartService.instance = new CartService();
    }
    return CartService.instance;
  }

  getCartItems(): CartItem[] {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  }

  addToCart(product: Product, quantity: number = 1): CartItem[] {
    const items = this.getCartItems();
    const existingItem = items.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.push({
        id: `cart-${product.id}`,
        product,
        quantity
      });
    }

    this.saveCart(items);
    return items;
  }

  removeFromCart(productId: string): CartItem[] {
    const items = this.getCartItems().filter(item => item.product.id !== productId);
    this.saveCart(items);
    return items;
  }

  updateQuantity(productId: string, quantity: number): CartItem[] {
    const items = this.getCartItems();
    const item = items.find(item => item.product.id === productId);
    
    if (item) {
      if (quantity <= 0) {
        return this.removeFromCart(productId);
      }
      item.quantity = quantity;
      this.saveCart(items);
    }
    
    return items;
  }

  clearCart(): void {
    localStorage.removeItem(this.storageKey);
  }

  getCartTotal(): number {
    return this.getCartItems().reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getCartItemCount(): number {
    return this.getCartItems().reduce((total, item) => total + item.quantity, 0);
  }

  private saveCart(items: CartItem[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }
}