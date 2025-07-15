import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { FilterOptions } from '../../types';
import { categories } from '../../data/mockData';
import { Button } from '../ui/Button';

interface ProductFiltersProps {
  filters: Partial<FilterOptions>;
  onFiltersChange: (filters: Partial<FilterOptions>) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFiltersChange,
  isOpen,
  onToggle
}) => {
  const [localFilters, setLocalFilters] = useState<Partial<FilterOptions>>(filters);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    onToggle();
  };

  const clearFilters = () => {
    const clearedFilters = {};
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <>
      {/* Filter Toggle Button */}
      <Button
        variant="outline"
        onClick={onToggle}
        className="flex items-center space-x-2"
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
        {hasActiveFilters && (
          <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1">
            {Object.keys(filters).length}
          </span>
        )}
      </Button>

      {/* Filter Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
          <div className="absolute inset-0 bg-black opacity-50 lg:hidden" onClick={onToggle} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg lg:relative lg:w-full lg:shadow-none">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
                <button
                  onClick={onToggle}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 lg:hidden"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          checked={localFilters.category === category.id}
                          onChange={(e) => handleFilterChange('category', e.target.value)}
                          className="mr-2 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {category.name} ({category.count})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                        Min Price
                      </label>
                      <input
                        type="number"
                        value={localFilters.minPrice || ''}
                        onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                        Max Price
                      </label>
                      <input
                        type="number"
                        value={localFilters.maxPrice || ''}
                        onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="1000"
                      />
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Availability</h4>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={localFilters.inStock || false}
                      onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">In Stock Only</span>
                  </label>
                </div>

                {/* Featured */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Featured</h4>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={localFilters.featured || false}
                      onChange={(e) => handleFilterChange('featured', e.target.checked)}
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Featured Products</span>
                  </label>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Minimum Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={localFilters.rating === rating}
                          onChange={(e) => handleFilterChange('rating', Number(e.target.value))}
                          className="mr-2 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {rating}+ Stars
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <Button onClick={applyFilters} className="w-full">
                  Apply Filters
                </Button>
                <Button variant="outline" onClick={clearFilters} className="w-full">
                  Clear All
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};