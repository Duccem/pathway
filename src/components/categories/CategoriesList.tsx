'use client'
import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Combobox } from "../ui/combobox";

interface CategoriesListProps {
  categories: Category[];
  selectedCategory: string | null;
}
const CategoriesList = ({ categories, selectedCategory }: CategoriesListProps) => {
  const [selected, setSelected] = useState(selectedCategory);
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search')
  
  const onClick = (categoryId: string | null) => {
    if(search) router.push(`/?search=${search}&categoryId=${categoryId}`);
    else router.push(categoryId ? `/?categoryId=${categoryId}` : "/");
  };
  useEffect(() => {
    onClick(selected);
  }, [selected])
  const options = categories.map((category) => ({ label: category.name, value: category.id }));
  return (
    <div className="flex flex-wrap px-4 gap-7 justify-center my-10">
      <Combobox placeholder="Filter by category" onChange={(value) => setSelected(value)} options={[
        { label: "All Categories", value: '' },
        ...options,
      ]} value={selected || ''}/>
    </div>
  );
}

export default CategoriesList;
