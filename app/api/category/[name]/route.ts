import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';

  try {
    // Use search endpoint with tagtype filter — much more reliable than category endpoint
    const url = `https://world.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=${encodeURIComponent(name)}&json=true&page=${page}&page_size=12&fields=code,product_name,brands,categories_tags,labels_tags,ingredients_text,nutrition_grades,nutriscore_grade,nutriments,image_front_url,image_url`;

    const response = await fetch(url, {
      headers: { 'User-Agent': 'FoodExplorer/1.0' },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json({ products: [], count: 0 });
    }

    const data = await response.json();

    return NextResponse.json({
      products: data.products || [],
      count: data.count || 0,
    });
  } catch (error) {
    console.error('Category API error:', error);
    return NextResponse.json({ products: [], count: 0 });
  }
}