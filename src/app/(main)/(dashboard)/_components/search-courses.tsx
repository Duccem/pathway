'use client'
import { Input } from "@/lib/ui/input";
import debounce from "lodash.debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";

const SearchCourses = ({ setSearchingState }: { setSearchingState?: (isSearching: boolean) => void; }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [term, setTerm] = useState('');
  const categoryId = searchParams.get('categoryId')
  const handleChange = useCallback(debounce((e: any)=> {
    setTerm(e.target.value)
  }, 500), [])
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    setSearchingState(isPending);
  }, [isPending])
  useEffect(() => {
    startTransition(() => {
      if(!term || term === '') {
        if(categoryId) router.replace(`/browse/?categoryId=${categoryId}`)
        else router.replace('/browse')
      }else {
        if(categoryId) {
          router.replace(`/browse/?categoryId=${categoryId}&search=${term}`)
        } else {
          router.replace(`/browse/?search=${term}`)
        }
      }
    })

  }, [term])
  return (
    <div>
      <Input autoFocus={true} placeholder="Search for courses..." onChange={handleChange}/>
    </div>
  );
}

export default SearchCourses;
