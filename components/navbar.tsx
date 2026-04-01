'use client';

import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface NavbarProps {
  onCartClick: () => void;
}

export function Navbar({ onCartClick }: NavbarProps) {
  const { itemCount } = useCart();

  return (
    <nav className="sticky top-0 z-40 w-full border-b-2 border-primary/20 bg-gradient-to-r from-background via-background to-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent p-2 flex items-center justify-center animate-bounce-subtle shadow-lg">
            <span className="text-lg font-bold text-white">🥗</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">FoodExplorer</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Discover Healthy Living</p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onCartClick}
          className="relative h-11 w-11 rounded-full hover:bg-primary/10 transition-all duration-300 group"
        >
          <div className="relative">
            <ShoppingCart className="h-6 w-6 text-primary group-hover:text-accent transition-colors duration-300" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-accent to-destructive text-xs font-bold text-white shadow-lg animate-bounce-subtle">
                {itemCount}
              </span>
            )}
          </div>
        </Button>
      </div>
    </nav>
  );
}
