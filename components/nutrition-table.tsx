import { NutritionValues } from '@/types';
import { Card } from '@/components/ui/card';

interface NutritionTableProps {
  nutritionValues: NutritionValues;
}

export function NutritionTable({ nutritionValues }: NutritionTableProps) {
  const items = [
    { label: 'Energy', value: nutritionValues.energy },
    { label: 'Fat', value: nutritionValues.fat },
    { label: 'Saturated Fat', value: nutritionValues.saturatedFat },
    { label: 'Carbohydrates', value: nutritionValues.carbohydrates },
    { label: 'Sugars', value: nutritionValues.sugars },
    { label: 'Fiber', value: nutritionValues.fiber },
    { label: 'Protein', value: nutritionValues.protein },
    { label: 'Salt', value: nutritionValues.salt },
  ];

  return (
    <Card className="overflow-hidden border-accent/20 bg-gradient-to-br from-accent/5 to-transparent rounded-xl shadow-md">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-accent/20 to-primary/20 border-b border-accent/20">
            <th className="px-4 py-3 text-left text-sm font-bold text-accent">
              Nutrient
            </th>
            <th className="px-4 py-3 text-right text-sm font-bold text-primary">
              Per 100g
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={item.label}
              className={`border-b border-accent/10 last:border-b-0 hover:bg-accent/10 transition-colors duration-200 ${
                index % 2 === 0 ? 'bg-gradient-to-r from-primary/5 to-transparent' : 'bg-accent/5'
              }`}
            >
              <td className="px-4 py-3 text-sm font-semibold text-foreground">
                {item.label}
              </td>
              <td className="px-4 py-3 text-right text-sm font-bold text-accent">
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
