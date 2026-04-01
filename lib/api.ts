import { Product, NutritionValues } from '@/types';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '';
  return 'http://localhost:3000';
};

function mapProduct(item: any): Product | null {
  if (!item || !item.code) return null;

  const nutriments = item.nutriments || {};

  const nutritionValues: NutritionValues = {
    energy: nutriments['energy-kcal_100g'] ? `${nutriments['energy-kcal_100g']} kcal` : 'N/A',
    fat: nutriments['fat_100g'] ? `${nutriments['fat_100g']}g` : 'N/A',
    saturatedFat: nutriments['saturated-fat_100g'] ? `${nutriments['saturated-fat_100g']}g` : 'N/A',
    carbohydrates: nutriments['carbohydrates_100g'] ? `${nutriments['carbohydrates_100g']}g` : 'N/A',
    sugars: nutriments['sugars_100g'] ? `${nutriments['sugars_100g']}g` : 'N/A',
    fiber: nutriments['fiber_100g'] ? `${nutriments['fiber_100g']}g` : 'N/A',
    protein: nutriments['proteins_100g'] ? `${nutriments['proteins_100g']}g` : 'N/A',
    salt: nutriments['salt_100g'] ? `${nutriments['salt_100g']}g` : 'N/A',
  };

  const ingredients = item.ingredients_text || '';
  const shortIngredients =
    ingredients.length > 100 ? ingredients.slice(0, 100) + '...' : ingredients;

  const gradeMap: Record<string, 'A' | 'B' | 'C' | 'D' | 'E'> = {
    a: 'A', b: 'B', c: 'C', d: 'D', e: 'E',
  };
  const rawGrade = (item.nutrition_grades || item.nutriscore_grade || '').toLowerCase();
  const nutritionGrade = gradeMap[rawGrade] || 'E';

  const labels = item.labels_tags
    ? item.labels_tags
        .map((l: string) =>
          l.replace('en:', '').replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
        )
        .slice(0, 5)
    : [];

  const categoryTags = item.categories_tags || [];
  const category =
    categoryTags.length > 0
      ? categoryTags[0]
          .replace('en:', '')
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (c: string) => c.toUpperCase())
      : 'Uncategorized';

  const name = item.product_name || item.product_name_en || '';

  return {
    id: item.code,
    name: name || 'Unknown Product',
    category,
    brand: item.brands || 'Unknown Brand',
    image: item.image_front_url || item.image_url || '/placeholder-product.jpg',
    barcode: item.code,
    nutritionGrade,
    ingredients,
    shortIngredients,
    nutritionValues,
    labels,
  };
}

export async function getCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${getBaseUrl()}/api/categories`, { cache: 'no-store' });
    const data = await response.json();

    if (!data || !data.tags || !Array.isArray(data.tags)) {
      return ['Beverages', 'Dairy', 'Snacks', 'Cereals', 'Fruits'];
    }

    const categories = data.tags
      .filter((tag: any) => tag.name && !tag.name.startsWith('('))
      .sort((a: any, b: any) => b.products - a.products)
      .slice(0, 20)
      .map((tag: any) => tag.name);

    return categories.length > 0
      ? categories
      : ['Beverages', 'Dairy', 'Snacks', 'Cereals', 'Fruits'];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return ['Beverages', 'Dairy', 'Snacks', 'Cereals', 'Fruits'];
  }
}

export async function getProducts(
  page: number = 1,
  limit: number = 12,
  category?: string,
  sortBy?: string,
  searchQuery?: string,
  barcodeQuery?: string
): Promise<{ products: Product[]; total: number }> {
  try {
    if (barcodeQuery) {
      const product = await getProductById(barcodeQuery);
      return {
        products: product ? [product] : [],
        total: product ? 1 : 0,
      };
    }

    const sortMap: Record<string, string> = {
      'name-asc': 'product_name',
      'name-desc': 'product_name',
      'grade-best': 'nutriscore_score',
      'grade-worst': 'nutriscore_score',
    };
    const apiSort = sortBy ? sortMap[sortBy] : 'unique_scans_n';

    let url = '';

    if (category) {
      const encodedCategory = encodeURIComponent(
        category.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '')
      );
      url = `${getBaseUrl()}/api/category/${encodedCategory}?page=${page}`;
    } else {
      const searchTerm = searchQuery || '';
      url = `${getBaseUrl()}/api/products?search_terms=${encodeURIComponent(searchTerm)}&page=${page}&page_size=${limit}&sort_by=${apiSort}`;
    }

    const response = await fetch(url, { cache: 'no-store' });
    const data = await response.json();

    let products = (data.products || [])
      .map(mapProduct)
      .filter((p: Product | null): p is Product => p !== null);

    if (category && searchQuery) {
      products = products.filter((p: Product) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === 'name-asc') {
      products.sort((a: Product, b: Product) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      products.sort((a: Product, b: Product) => b.name.localeCompare(a.name));
    } else if (sortBy === 'grade-best') {
      const gradeOrder: Record<string, number> = { A: 0, B: 1, C: 2, D: 3, E: 4 };
      products.sort(
        (a: Product, b: Product) =>
          gradeOrder[a.nutritionGrade] - gradeOrder[b.nutritionGrade]
      );
    } else if (sortBy === 'grade-worst') {
      const gradeOrder: Record<string, number> = { A: 0, B: 1, C: 2, D: 3, E: 4 };
      products.sort(
        (a: Product, b: Product) =>
          gradeOrder[b.nutritionGrade] - gradeOrder[a.nutritionGrade]
      );
    }

    const total = data.count || products.length;
    return { products, total };
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return { products: [], total: 0 };
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`${getBaseUrl()}/api/product/${id}`, { cache: 'no-store' });

    if (!response.ok) return null;

    const data = await response.json();

    if (!data || data.status !== 1 || !data.product) return null;

    return mapProduct({ ...data.product, code: id });
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const response = await fetch(
      `${getBaseUrl()}/api/products?search_terms=${encodeURIComponent(query)}&page_size=10`,
      { cache: 'no-store' }
    );
    const data = await response.json();

    return (data.products || [])
      .map(mapProduct)
      .filter((p: Product | null): p is Product => p !== null);
  } catch (error) {
    console.error('Failed to search products:', error);
    return [];
  }
}