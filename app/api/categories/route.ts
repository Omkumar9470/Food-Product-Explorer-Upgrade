import { NextResponse } from 'next/server';

const FALLBACK = {
  tags: [
    { name: 'Beverages', products: 1000 },
    { name: 'Dairy products', products: 900 },
    { name: 'Snacks', products: 800 },
    { name: 'Cereals', products: 700 },
    { name: 'Fruits', products: 600 },
    { name: 'Vegetables', products: 500 },
    { name: 'Meats', products: 400 },
    { name: 'Bakery products', products: 300 },
    { name: 'Frozen foods', products: 200 },
    { name: 'Sauces', products: 100 },
  ],
};

export async function GET() {
  try {
    const response = await fetch(
      'https://world.openfoodfacts.org/categories.json',
      {
        headers: { 'User-Agent': 'FoodExplorer/1.0' },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return NextResponse.json(FALLBACK);
    }

    const data = await response.json();

    if (!data?.tags) {
      return NextResponse.json(FALLBACK);
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(FALLBACK);
  }
}