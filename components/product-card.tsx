'use client';

import { Product } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner' 

interface ProductCardProps {
  product: Product;
}

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

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

const handleAddToCart = (e: React.MouseEvent) => {
  e.preventDefault();
  addItem(product);
  toast.success(`${product.name} added to cart!`, {
    description: 'View your cart to see all items.',
    duration: 3000,
  });
};

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-1 cursor-pointer border border-primary/10 bg-white dark:bg-slate-900 animate-fade-in-up">
        {/* Image container */}
        <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Nutrition grade badge */}
          <div
            className={`absolute top-4 right-4 flex h-14 w-14 items-center justify-center rounded-2xl font-bold text-2xl ${
              GRADE_COLORS[product.nutritionGrade]
            } ${GRADE_TEXT_COLORS[product.nutritionGrade]} border-2 border-white/30 backdrop-blur-sm animate-bounce-subtle`}
          >
            {product.nutritionGrade}
          </div>

          {/* Quick overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <p className="text-white text-xs font-medium">View Details</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          {/* Category */}
          <p className="text-xs font-bold uppercase bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            {product.category}
          </p>

          {/* Product name */}
          <h3 className="font-bold text-foreground line-clamp-2 mb-2 text-sm">
            {product.name}
          </h3>

          {/* Ingredients */}
          <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
            {product.shortIngredients}
          </p>

          {/* Add to cart button */}
          <Button
            onClick={handleAddToCart}
            className="mt-4 w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 font-semibold text-white"
            size="sm"
          >
            + Add to Cart
          </Button>
        </div>
      </Card>
    </Link>
  );
}
