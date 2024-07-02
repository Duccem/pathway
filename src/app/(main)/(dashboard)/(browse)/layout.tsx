import { getCategories } from "@/modules/Course/presentation/page-actions/get-categories";
import FilterCoursesBrowse from "../_components/filter-courses-browse";


const Layout = async  ({ children }) => {
  const categories = await getCategories();
  return (
    <div className="px-4 py-6 md:mt-5 md:px-10 xl:px-16 w-full">
      <FilterCoursesBrowse categories={categories}/>

      <div className="flex flex-wrap gap-7 justify-start">
        { children }
      </div>
    </div>
  );
};

export default Layout;
