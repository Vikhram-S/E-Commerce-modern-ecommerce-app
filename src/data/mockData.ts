import { Product, Category } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 199.99,
    originalPrice: 249.99,
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    rating: 4.5,
    reviews: 128,
    inStock: true,
    featured: true,
    tags: ['wireless', 'bluetooth', 'noise-cancellation']
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 299.99,
    description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and water resistance.',
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    rating: 4.7,
    reviews: 89,
    inStock: true,
    featured: true,
    tags: ['fitness', 'smartwatch', 'GPS']
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    price: 39.99,
    originalPrice: 49.99,
    description: 'Comfortable and sustainable organic cotton t-shirt available in multiple colors. Perfect for everyday wear.',
    image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Clothing',
    rating: 4.2,
    reviews: 156,
    inStock: true,
    featured: false,
    tags: ['organic', 'cotton', 'sustainable']
  },
  {
    id: '4',
    name: 'Professional Camera Lens',
    price: 899.99,
    description: 'High-quality 50mm prime lens for professional photography. Sharp images with beautiful bokeh effect.',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    rating: 4.8,
    reviews: 67,
    inStock: false,
    featured: true,
    tags: ['photography', 'lens', 'professional']
  },
  {
    id: '5',
    name: 'Leather Laptop Bag',
    price: 149.99,
    description: 'Premium leather laptop bag with multiple compartments. Perfect for business professionals and students.',
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Accessories',
    rating: 4.4,
    reviews: 92,
    inStock: true,
    featured: false,
    tags: ['leather', 'laptop', 'business']
  },
  {
    id: '6',
    name: 'Wireless Charging Pad',
    price: 49.99,
    originalPrice: 59.99,
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.',
    image: 'https://images.pexels.com/photos/4790267/pexels-photo-4790267.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    rating: 4.1,
    reviews: 234,
    inStock: true,
    featured: false,
    tags: ['wireless', 'charging', 'Qi']
  },
  {
    id: '7',
    name: 'Yoga Mat Premium',
    price: 79.99,
    description: 'Non-slip yoga mat made from eco-friendly materials. Perfect for yoga, pilates, and general fitness.',
    image: 'https://images.pexels.com/photos/3823207/pexels-photo-3823207.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Sports',
    rating: 4.6,
    reviews: 145,
    inStock: true,
    featured: false,
    tags: ['yoga', 'fitness', 'eco-friendly']
  },
  {
    id: '8',
    name: 'Coffee Grinder',
    price: 129.99,
    description: 'Electric burr coffee grinder with 15 grind settings. Perfect for coffee enthusiasts who want fresh ground coffee.',
    image: 'https://images.pexels.com/photos/4226263/pexels-photo-4226263.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Kitchen',
    rating: 4.3,
    reviews: 78,
    inStock: true,
    featured: true,
    tags: ['coffee', 'grinder', 'kitchen']
  }
];

export const categories: Category[] = [
  { id: 'all', name: 'All Products', count: products.length },
  { id: 'electronics', name: 'Electronics', count: products.filter(p => p.category === 'Electronics').length },
  { id: 'clothing', name: 'Clothing', count: products.filter(p => p.category === 'Clothing').length },
  { id: 'accessories', name: 'Accessories', count: products.filter(p => p.category === 'Accessories').length },
  { id: 'sports', name: 'Sports', count: products.filter(p => p.category === 'Sports').length },
  { id: 'kitchen', name: 'Kitchen', count: products.filter(p => p.category === 'Kitchen').length }
];