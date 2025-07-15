import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product, FilterOptions, ViewMode, SortOption } from '../types';
import { SearchService } from '../services/SearchService';
import { ProductService } from '../services/ProductService';
import { ProductGrid } from '../components/products/ProductGrid';
import { ProductList } from '../components/products/ProductList';
import { ProductFilters } from '../components/products/ProductFilters';
import { ViewToggle } from '../components/common/ViewToggle';
import { SortSelect } from '../components/common/SortSelect';
import { Loading, SkeletonGrid } from '../components/ui/Loading';
import { Error } from '../components/ui/Error';

export const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [filters, setFilters] = useState<Partial<FilterOptions>>({});
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const searchQuery = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const searchService = SearchService.getInstance();
        const productService = ProductService.getInstance();
        
        // Apply category filter from URL
        const appliedFilters = {
          ...filters,
          ...(categoryParam && { category: categoryParam })
        };
        
        let result: Product[];
        
        if (searchQuery || Object.keys(appliedFilters).length > 0) {
          result = await searchService.searchAndFilter(searchQuery, appliedFilters);
        } else {
          result = await productService.getAllProducts();
        }
        
        // Sort products
        const sortedProducts = productService.sortProducts(result, sortBy);
        setProducts(sortedProducts);
      } catch (err) {
        setError('Failed to load products. Please try again.');
        console.error('Error loading products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [searchQuery, categoryParam, filters, sortBy]);

  const handleFiltersChange = (newFilters: Partial<FilterOptions>) => {
    setFilters(newFilters);
  };

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    // Trigger reload by updating a state
    setFilters(prev => ({ ...prev }));
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error message={error} onRetry={handleRetry} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
              </h1>
              {!isLoading && (
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {products.length} product{products.length !== 1 ? 's' : ''} found
                </p>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <ProductFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                isOpen={isFiltersOpen}
                onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
              />
              <SortSelect value={sortBy} onChange={setSortBy} />
            </div>
            <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
          </div>
        </div>

        {/* Products */}
        {isLoading ? (
          <SkeletonGrid count={8} />
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 text-lg">
              No products found matching your criteria.
            </div>
            <p className="text-gray-400 dark:text-gray-500 mt-2">
              Try adjusting your filters or search terms.
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          <ProductGrid products={products} />
        ) : (
          <ProductList products={products} />
        )}
      </div>
    </div>
  );
};