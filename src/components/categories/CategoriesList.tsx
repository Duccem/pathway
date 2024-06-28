'use client'
import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

interface CategoriesListProps {
  categories: Category[];
  selectedCategory: string | null;
}
const CategoriesList = ({ categories, selectedCategory }: CategoriesListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search')

  const onClick = (categoryId: string | null) => {
    if(search) router.push(`/?search=${search}&categoryId=${categoryId}`);
    else router.push(categoryId ? `/?categoryId=${categoryId}` : "/");
  };
  return (
    <div className="flex flex-wrap px-4 gap-7 justify-center my-10">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        onClick={() => onClick(null)}
      >
        All Categories
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => onClick(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}

export default CategoriesList;
