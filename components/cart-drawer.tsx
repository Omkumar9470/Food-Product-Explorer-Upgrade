'use client';

import { useCart } from '@/lib/cart-context';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import Image from 'next/image';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeItem, updateQuantity } = useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-md flex flex-col border-l-2 border-primary/20">
        <SheetHeader>
          <SheetTitle className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            🛒 Shopping Cart
          </SheetTitle>
          <SheetDescription>
            {items.length === 0
              ? 'Your cart is empty'
              : `${items.length} ${items.length === 1 ? 'item' : 'items'} in your cart`}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-6xl">🛍️</div>
              <p className="text-foreground font-semibold text-lg">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">Add some healthy food products to get started!</p>
              <Button
                className="mt-4 bg-gradient-to-r from-primary to-accent text-white font-semibold transition-all duration-300"
                onClick={() => onOpenChange(false)}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Cart items */}
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map((item, index) => (
                <div key={item.id} className="flex gap-4 border-b border-primary/10 pb-4 hover:bg-primary/5 rounded-lg p-2 transition-all duration-300" style={{ animationDelay: `${index * 50}ms` }} >
                  {/* Product image */}
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 shadow-md hover:shadow-lg transition-shadow">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product info */}
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-foreground line-clamp-2">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-primary font-semibold mt-1">
                      {item.product.category}
                    </p>

                    {/* Quantity control */}
                    <div className="flex items-center gap-1 mt-3 bg-muted rounded-lg p-1">
                      <Button
                        size="sm"
                        className="h-6 w-6 p-0 bg-primary/20 hover:bg-primary/40 text-primary transition-all"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        −
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.product.id,
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="h-6 w-12 text-center text-sm border-0 bg-transparent font-semibold"
                      />
                      <Button
                        size="sm"
                        className="h-6 w-6 p-0 bg-accent/20 hover:bg-accent/40 text-accent transition-all"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {/* Remove button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-destructive/20 text-destructive hover:text-destructive transition-all"
                    onClick={() => removeItem(item.product.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Checkout button */}
            <div className="border-t border-primary/10 pt-4 space-y-2">
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 text-white font-bold py-6 transition-all duration-300 rounded-xl" size="lg">
                ✨ Proceed to Checkout
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-xl border-primary/20 hover:bg-primary/10 transition-all duration-300"
                onClick={() => onOpenChange(false)}
              >
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
