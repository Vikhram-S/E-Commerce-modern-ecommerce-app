export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
  tags: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export interface FilterOptions {
  category: string;
  minPrice: number;
  maxPrice: number;
  inStock: boolean;
  featured: boolean;
  rating: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export type ViewMode = 'grid' | 'list';
export type Theme = 'light' | 'dark';
export type SortOption = 'name' | 'price-asc' | 'price-desc' | 'rating' | 'newest';