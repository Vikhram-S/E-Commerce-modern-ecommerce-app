import { Product, FilterOptions, SortOption } from '../types';
import { products } from '../data/mockData';

export class ProductService {
  private static instance: ProductService;
  private products: Product[] = products;

  static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  async getAllProducts(): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...this.products];
  }

  async getProductById(id: string): Promise<Product | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.products.find(product => product.id === id) || null;
  }

  async searchProducts(query: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const lowercaseQuery = query.toLowerCase();
    return this.products.filter(product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  async filterProducts(filters: Partial<FilterOptions>): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.products.filter(product => {
      if (filters.category && filters.category !== 'all' && product.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }
      if (filters.minPrice !== undefined && product.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
        return false;
      }
      if (filters.inStock !== undefined && product.inStock !== filters.inStock) {
        return false;
      }
      if (filters.featured !== undefined && product.featured !== filters.featured) {
        return false;
      }
      if (filters.rating !== undefined && product.rating < filters.rating) {
        return false;
      }
      return true;
    });
  }

  sortProducts(products: Product[], sortBy: SortOption): Product[] {
    const sorted = [...products];
    switch (sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.reverse();
      default:
        return sorted;
    }
  }

  async getFeaturedProducts(): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.products.filter(product => product.featured);
  }
}