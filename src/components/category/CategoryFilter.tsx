"use client";

import { Button } from "@/src/components/ui/button";
import CategoryFilterSkeleton from "@/src/components/skeletons/CategoryFilterSkeleton";
import { useCategories } from "@/src/hooks/useCategories";

type CategoryFilterProps = {
  selectedCategories: string[];
  onChange: (nextCategories: string[]) => void;
};

export default function CategoryFilter({
  selectedCategories,
  onChange,
}: CategoryFilterProps) {

  const { categories, isLoading } = useCategories();

  const handleToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onChange(selectedCategories.filter((item) => item !== category));
      return;
    }

    onChange([...selectedCategories, category]);

  };

  if (isLoading) {
    return <CategoryFilterSkeleton />;
  }

  return (
    <section className="flex overflow-hidden lg:mb-8" aria-label="Filtrar por categoria">
      <div className="flex w-1280 
        overflow-x-scroll 
        lg:items-center lg:justify-center lg:overflow-x-hidden 
        [&::-webkit-scrollbar]:[width:10px]"
      >
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category);

          return (
            <Button
              key={category}
              type="button"
              size="lg"
              variant={isSelected ? "default" : "outline"}
              aria-pressed={isSelected}
              aria-label={`${isSelected ? "Remover" : "Aplicar"} filtro ${category}`}
              onClick={() => handleToggle(category)}
              className="rounded-none border-t-0"
            >
              {category}
            </Button>
          );
        })}
      </div>
    </section>
  );
}
