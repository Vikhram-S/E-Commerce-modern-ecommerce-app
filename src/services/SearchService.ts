import { Product, FilterOptions } from '../types';
import { ProductService } from './ProductService';

export class SearchService {
  private static instance: SearchService;
  private productService = ProductService.getInstance();

  static getInstance(): SearchService {
    if (!SearchService.instance) {
      SearchService.instance = new SearchService();
    }
    return SearchService.instance;
  }

  async searchAndFilter(query: string, filters: Partial<FilterOptions>): Promise<Product[]> {
    let products: Product[];

    if (query.trim()) {
      products = await this.productService.searchProducts(query);
    } else {
      products = await this.productService.getAllProducts();
    }

    // Apply filters
    if (Object.keys(filters).length > 0) {
      products = await this.applyFilters(products, filters);
    }

    return products;
  }

  private async applyFilters(products: Product[], filters: Partial<FilterOptions>): Promise<Product[]> {
    return products.filter(product => {
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
}