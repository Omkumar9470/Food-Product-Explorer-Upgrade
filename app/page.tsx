'use client';

import { useState, useEffect, useCallback } from 'react';
import { Navbar } from '@/components/navbar';
import { CartDrawer } from '@/components/cart-drawer';
import { SearchBar } from '@/components/search-bar';
import { FilterBar } from '@/components/filter-bar';
import { ProductGrid } from '@/components/product-grid';
import { Button } from '@/components/ui/button';
import { getCategories, getProducts } from '@/lib/api';

export default function HomePage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Filters and search
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [barcodeQuery, setBarcodeQuery] = useState('');

  // Load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      const cats = await getCategories();
      setCategories(cats);
    };
    loadCategories();
  }, []);

  // Load products whenever filters change
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setCurrentPage(1);

      const { products: newProducts, total } = await getProducts(
        1,
        12,
        selectedCategory === 'all' ? undefined : selectedCategory,
        selectedSort || undefined,
        searchQuery,
        barcodeQuery
      );

      setProducts(newProducts);
      setHasMore(newProducts.length < total);
      setIsLoading(false);
    };

    // Debounce search
    const timer = setTimeout(() => {
      loadProducts();
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedCategory, selectedSort, searchQuery, barcodeQuery]);

  const handleLoadMore = useCallback(async () => {
  const nextPage = currentPage + 1;
  setIsLoading(true);

  const { products: newProducts, total } = await getProducts(
    nextPage,
    12,
    selectedCategory === 'all' ? undefined : selectedCategory,
    selectedSort || undefined,
    searchQuery,
    barcodeQuery
  );

  setProducts((prev) => {
    const updated = [...prev, ...newProducts];
    setHasMore(updated.length < total);
    return updated;
  });

  setCurrentPage(nextPage);
  setIsLoading(false);
}, [currentPage, selectedCategory, selectedSort, searchQuery, barcodeQuery]);

  const handleResetFilters = useCallback(() => {
    setSelectedCategory('all');
    setSelectedSort('');
    setSearchQuery('');
    setBarcodeQuery('');
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar onCartClick={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />

      {/* Hero section */}
      <section className="w-full relative overflow-hidden py-16 sm:py-24 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border-b-2 border-primary/20">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse opacity-40"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse opacity-30 delay-700"></div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6 animate-fade-in-up">
            <div className="inline-block">
              <div className="px-4 py-2 bg-gradient-to-r from-primary to-accent rounded-full text-sm font-bold text-white mb-4 shadow-lg">
                ✨ Healthy Eating Starts Here
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Discover Your Perfect Food
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Explore thousands of nutritious food products with detailed nutrition grades, ingredient analysis, and health ratings
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="flex-1 w-full py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search section */}
          <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">🔍 Find Your Perfect Match</h2>
            <SearchBar
              onSearchChange={setSearchQuery}
              onBarcodeChange={setBarcodeQuery}
            />
          </div>

          {/* Filter section */}
          <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent mb-4">⚙️ Filter & Sort</h2>
            <FilterBar
              categories={categories}
              selectedCategory={selectedCategory}
              selectedSort={selectedSort}
              onCategoryChange={setSelectedCategory}
              onSortChange={setSelectedSort}
              onReset={handleResetFilters}
            />
          </div>

          {/* Product grid */}
          <div className="mb-8">
            <ProductGrid products={products} isLoading={isLoading} />
          </div>

          {/* Load more button */}
          {hasMore && products.length > 0 && (
            <div className="flex justify-center animate-fade-in-up">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 text-white font-bold px-8 transition-all duration-300"
                onClick={handleLoadMore}
              >
                📦 Load More Products
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
