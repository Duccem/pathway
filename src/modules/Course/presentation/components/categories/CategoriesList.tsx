'use client'
import { Combobox } from "@/lib/ui/combobox";
import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

interface CategoriesListProps {
  categories: Category[];
  setSearchingState?: (isSearching: boolean) => void;
}
const CategoriesList = ({ categories, setSearchingState }: CategoriesListProps) => {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('categoryId');
  const [selected, setSelected] = useState(selectedCategory);
  const router = useRouter();
  const search = searchParams.get('search')
  const [isPending, startTransition] = useTransition();
  
  const onClick = (categoryId: string | null) => {
    startTransition(() => {
      if(categoryId) {
        if(search) router.replace(`/browse/?categoryId=${categoryId}&search=${search}`)
        else router.replace(`/browse/?categoryId=${categoryId}`)
      } else {
        if(search) router.replace(`/browse/?search=${search}`)
        else router.replace(`/browse`)
      }
    })
  };
  useEffect(() => {
    setSearchingState(isPending);
  }, [isPending])
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
