import { db } from '../db';

export const getCategories = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
    include: {
      subcategories: {
        orderBy: {
          name: 'asc',
        },
      },
    },
  });
  return categories;
};
