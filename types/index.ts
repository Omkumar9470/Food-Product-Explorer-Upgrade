export interface NutritionValues {
  energy: string;
  fat: string;
  saturatedFat: string;
  carbohydrates: string;
  sugars: string;
  fiber: string;
  protein: string;
  salt: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  image: string;
  barcode: string;
  nutritionGrade: 'A' | 'B' | 'C' | 'D' | 'E';
  ingredients: string;
  shortIngredients: string;
  nutritionValues: NutritionValues;
  labels: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}
