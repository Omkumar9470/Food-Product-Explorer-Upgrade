'use client';

import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Barcode, X } from 'lucide-react';

interface SearchBarProps {
  onSearchChange: (query: string) => void;
  onBarcodeChange: (query: string) => void;
}

export function SearchBar({ onSearchChange, onBarcodeChange }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [barcodeQuery, setBarcodeQuery] = useState('');

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    onSearchChange(value);
  }, [onSearchChange]);

  const handleBarcodeChange = useCallback((value: string) => {
    setBarcodeQuery(value);
    onBarcodeChange(value);
  }, [onBarcodeChange]);

  const clearSearch = () => {
    setSearchQuery('');
    onSearchChange('');
  };

  const clearBarcode = () => {
    setBarcodeQuery('');
    onBarcodeChange('');
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
      {/* Product name search */}
      <div className="relative flex-1 group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary group-hover:text-accent transition-colors">
          <Search className="h-5 w-5" />
        </div>
        <Input
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-12 pr-10 h-12 rounded-xl border-2 border-primary/20 bg-white dark:bg-slate-800 focus:border-primary shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300 focus:ring-4 focus:ring-primary/10"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors hover:scale-125"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Barcode search */}
      <div className="relative flex-1 group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-accent group-hover:text-primary transition-colors">
          <Barcode className="h-5 w-5" />
        </div>
        <Input
          placeholder="Search by barcode..."
          value={barcodeQuery}
          onChange={(e) => handleBarcodeChange(e.target.value)}
          className="pl-12 pr-10 h-12 rounded-xl border-2 border-accent/20 bg-white dark:bg-slate-800 focus:border-accent shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-300 focus:ring-4 focus:ring-accent/10"
        />
        {barcodeQuery && (
          <button
            onClick={clearBarcode}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors hover:scale-125"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
