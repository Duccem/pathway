import CreateCourseForm from "@/components/course/CreateCourseForm";
import { db } from "@/lib/db";

const CreateCoursePage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc'
    },
    include:{
      subcategories: true
    }
  });
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
