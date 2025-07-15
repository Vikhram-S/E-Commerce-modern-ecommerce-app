# Modern E-commerce Product Catalog

A comprehensive e-commerce product catalog built with React.js, TypeScript, and Tailwind CSS. This application demonstrates modern web development practices with a focus on performance, accessibility, and user experience.

## 🚀 Features

### Core Functionality
- **Product Catalog**: Grid and list view toggle with responsive design
- **Advanced Search & Filtering**: Real-time search with category, price, rating, and availability filters
- **Product Details**: Detailed product pages with image galleries and specifications
- **Shopping Cart**: Full cart management with quantity controls and persistent storage
- **Wishlist**: Save favorite products with localStorage persistence
- **Theme Switcher**: Light/dark mode toggle with system preference detection

### Technical Features
- **Responsive Design**: Mobile-first approach with breakpoints for all device sizes
- **TypeScript**: Full type safety throughout the application
- **Context API**: State management for cart, wishlist, and theme
- **Service Layer**: Clean separation of concerns with dedicated services
- **Error Handling**: Comprehensive error states and loading indicators
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## 🏗️ Architecture

### Service Layer (Microservices Approach)
```
src/services/
├── ProductService.ts     # Product data management
├── CartService.ts        # Cart operations and persistence
├── WishlistService.ts    # Wishlist management
└── SearchService.ts      # Search and filtering logic
```

### Context Providers
```
src/contexts/
├── CartContext.tsx       # Cart state management
├── WishlistContext.tsx   # Wishlist state management
└── ThemeContext.tsx      # Theme switching
```

### Component Structure
```
src/components/
├── layout/              # Header, Footer, Navigation
├── products/            # Product-related components
├── common/              # Reusable components
└── ui/                  # Base UI components
```

## 🛠️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-catalog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Main actions and links
- **Secondary**: Purple (#8B5CF6) - Secondary actions
- **Accent**: Emerald (#10B981) - Success states
- **Warning**: Orange (#F97316) - Warning states
- **Error**: Red (#EF4444) - Error states

### Typography
- **Headings**: 120% line height, bold weight
- **Body**: 150% line height, regular weight
- **Maximum 3 font weights**: Regular, medium, bold

### Spacing System
- **8px base unit**: All spacing follows 8px increments
- **Consistent margins**: Proper visual hierarchy
- **Responsive breakpoints**: Mobile-first approach

## 🔧 Technical Decisions

### State Management
- **Context API**: Chosen for its simplicity and React integration
- **localStorage**: For cart and wishlist persistence
- **Service Layer**: Separation of business logic from components

### Performance Optimizations
- **Code Splitting**: React.lazy for route-based splitting
- **Image Optimization**: Responsive images with proper sizing
- **Skeleton Loading**: Improved perceived performance
- **Debounced Search**: Reduced API calls

### Accessibility
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Proper focus indicators
- **Color Contrast**: WCAG AA compliance

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Features by Breakpoint
- **Mobile**: Stacked layout, slide-out filters, touch-friendly buttons
- **Tablet**: 2-column grid, adaptive navigation
- **Desktop**: 4-column grid, sidebar filters, hover states

## 🚀 Performance Features

### Loading States
- **Skeleton Components**: Smooth loading experience
- **Progressive Loading**: Images load as needed
- **Error Boundaries**: Graceful error handling

### Optimization Techniques
- **React.memo**: Prevent unnecessary re-renders
- **useCallback**: Memoize event handlers
- **useMemo**: Expensive calculations
- **Lazy Loading**: Route-based code splitting

## 🎯 Future Enhancements

### Planned Features
- **User Authentication**: Login/signup functionality
- **Checkout Process**: Complete purchase flow
- **Product Reviews**: User-generated reviews
- **Product Recommendations**: AI-powered suggestions
- **Inventory Management**: Real-time stock updates

### Technical Improvements
- **PWA Support**: Service workers and offline functionality
- **API Integration**: Real backend integration
- **Testing Suite**: Unit and integration tests
- **Performance Monitoring**: Analytics and monitoring

## 📊 Browser Support

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Developer
---

**Created by: Vikhram S**  
Software Developer  
📧 [vikhrams@saveetha.ac.in](mailto:vikhrams@saveetha.ac.in)

© 2024. All rights reserved.

Built with ❤️ using React, TypeScript, and Tailwind CSS