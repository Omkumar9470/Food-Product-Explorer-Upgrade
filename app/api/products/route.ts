import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('page_size') || '12';
  const searchTerms = searchParams.get('search_terms') || '';
  const sortBy = searchParams.get('sort_by') || 'unique_scans_n';

  try {
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(searchTerms)}&json=true&page=${page}&page_size=${pageSize}&sort_by=${sortBy}&fields=code,product_name,brands,categories_tags,labels_tags,ingredients_text,nutrition_grades,nutriscore_grade,nutriments,image_front_url,image_url`;

    console.log('Fetching URL:', url);

    const response = await fetch(url, {
      headers: { 'User-Agent': 'FoodExplorer/1.0' },
      cache: 'no-store',
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      console.log('Response not ok, returning empty');
      return NextResponse.json({ products: [], count: 0 });
    }

    const data = await response.json();
    console.log('Products in response:', data.products?.length);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json({ products: [], count: 0 });
  }
}