import CreateCourseForm from "@/components/course/CreateCourseForm";
import { getCategories } from "@/lib/queries/categories";

const CreateCoursePage = async () => {
  const categories = await getCategories();
  return (
    <div>
      <CreateCourseForm categories={categories.map((category) => ({ 
        label: category.name, 
        value: category.id,
        subcategories: category.subcategories.map((subcategory) => ({
          label: subcategory.name,
          value: subcategory.id
        }))
      }))}/>
    </div>
  );
}

export default CreateCoursePage;
