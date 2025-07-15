import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, X, ArrowRight } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/Button';
import { Loading } from '../components/ui/Loading';

export const Wishlist: React.FC = () => {
  const { items, removeFromWishlist, clearWishlist, isLoading } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item: any) => {
    addToCart(item.product);
    removeFromWishlist(item.product.id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Loading text="Loading wishlist..." />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <Heart className="h-24 w-24 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Start exploring and save items you love.
            </p>
            <Button size="lg">
              <Link to="/products" className="flex items-center space-x-2">
                <span>Start Shopping</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Wishlist
          </h1>
          <Button variant="outline" onClick={clearWishlist} size="sm">
            Clear Wishlist
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden group">
              <div className="relative">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => removeFromWishlist(item.product.id)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  <Link
                    to={`/products/${item.product.id}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {item.product.name}
                  </Link>
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {item.product.category}
                </p>
                
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ${item.product.price}
                  </span>
                  {item.product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${item.product.originalPrice}
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.product.inStock}
                    className="flex-1 flex items-center justify-center space-x-1"
                    size="sm"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="px-3"
                  >
                    <Link to={`/products/${item.product.id}`}>
                      View
                    </Link>
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Added {new Date(item.addedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};