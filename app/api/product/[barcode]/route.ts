import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ barcode: string }> }
) {
  const { barcode } = await params;

  try {
    const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;

    const response = await fetch(url, {
      headers: { 'User-Agent': 'FoodExplorer/1.0' },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return NextResponse.json({ status: 0, product: null });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Product API error:', error);
    return NextResponse.json({ status: 0, product: null });
  }
}