'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Product } from '@/types';
import { getProductById } from '@/lib/api';
import { useCart } from '@/lib/cart-context';
import { Navbar } from '@/components/navbar';
import { CartDrawer } from '@/components/cart-drawer';
import { NutritionTable } from '@/components/nutrition-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

const GRADE_COLORS: Record<string, string> = {
  A: 'bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-400/50',
  B: 'bg-gradient-to-br from-lime-300 to-lime-500 shadow-lg shadow-lime-400/50',
  C: 'bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-lg shadow-yellow-400/50',
  D: 'bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-400/50',
  E: 'bg-gradient-to-br from-red-400 to-red-600 shadow-lg shadow-red-400/50',
};

const GRADE_TEXT_COLORS: Record<string, string> = {
  A: 'text-white',
  B: 'text-gray-900',
  C: 'text-gray-900',
  D: 'text-white',
  E: 'text-white',
};

const LABEL_COLORS: Record<string, string> = {
  Organic: 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300 font-semibold',
  Vegan: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300 font-semibold',
  'Gluten-Free': 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300 font-semibold',
  'No Added Sugar': 'bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 border border-amber-300 font-semibold',
  Natural: 'bg-gradient-to-r from-teal-100 to-teal-200 text-teal-800 border border-teal-300 font-semibold',
  'High Fiber': 'bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border border-emerald-300 font-semibold',
  'Whole Grain': 'bg-gradient-to-r from-lime-100 to-lime-200 text-lime-800 border border-lime-300 font-semibold',
  Probiotic: 'bg-gradient-to-r from-cyan-100 to-cyan-200 text-cyan-800 border border-cyan-300 font-semibold',
  'High Protein': 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300 font-semibold',
  'Low Sugar': 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border border-orange-300 font-semibold',
  'Fair Trade': 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300 font-semibold',
};

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      const foundProduct = await getProductById(id);
      setProduct(foundProduct);
      setIsLoading(false);
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      setCartOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar onCartClick={() => setCartOpen(true)} />
        <main className="flex-1 w-full py-8 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-10 w-20 mb-8" />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Skeleton className="h-96 w-full rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar onCartClick={() => setCartOpen(true)} />
        <main className="flex-1 w-full py-16 sm:py-24 flex items-center justify-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6 animate-fade-in-up">
              <div className="text-7xl">🔍</div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Product not found</h1>
              <p className="text-lg text-muted-foreground">We couldn&apos;t find the product you&apos;re looking for.</p>
              <Button onClick={() => router.push('/')} className="mt-6 bg-gradient-to-r from-primary to-accent text-white font-bold px-8 py-3 rounded-xl hover:shadow-lg transition-all">
                Back to Home
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar onCartClick={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />

      <main className="flex-1 w-full py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="mb-8 text-primary hover:bg-primary/10 transition-all"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Products
          </Button>

          {/* Product details grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-8 animate-fade-in-up">
            {/* Left side - Product image */}
            <div className="space-y-4">
              <div className="relative h-96 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 mb-4 shadow-lg hover:shadow-xl transition-shadow">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Nutrition grade */}
              <div className="space-y-2">
                <div
                  className={`inline-flex h-24 w-24 items-center justify-center rounded-2xl font-bold text-3xl ${
                    GRADE_COLORS[product.nutritionGrade]
                  } ${GRADE_TEXT_COLORS[product.nutritionGrade]} shadow-lg animate-bounce-subtle`}
                >
                  {product.nutritionGrade}
                </div>
                <p className="text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Nutrition Grade</p>
              </div>
            </div>

            {/* Right side - Product info */}
            <div className="flex flex-col">
              {/* Name and category */}
              <h1 className="text-5xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                {product.name}
              </h1>
              <p className="text-lg font-semibold text-muted-foreground mb-6">
                {product.brand} • {product.category}
              </p>

              {/* Labels */}
              {product.labels.length > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {product.labels.map((label) => (
                      <Badge
                        key={label}
                        className={LABEL_COLORS[label] || 'bg-gray-100 text-gray-800'}
                      >
                        {label}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to cart button */}
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="mb-6 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 text-white font-bold py-7 text-lg transition-all duration-300 rounded-xl"
              >
                🛒 Add to Cart
              </Button>

              {/* Product info */}
              <Card className="p-5 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl shadow-md">
                <h3 className="font-semibold text-foreground mb-3">Product Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Barcode</p>
                    <p className="text-sm font-mono text-foreground">{product.barcode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Brand</p>
                    <p className="text-sm text-foreground">{product.brand}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="text-sm text-foreground">{product.category}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Ingredients and Nutrition */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {/* Ingredients */}
            <Card className="p-6 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">📋 Ingredients</h2>
              <p className="text-foreground leading-relaxed text-sm line-clamp-6">
                {product.ingredients}
              </p>
            </Card>

            {/* Nutrition values table */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">⚡ Nutritional Values</h2>
              <NutritionTable nutritionValues={product.nutritionValues} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
