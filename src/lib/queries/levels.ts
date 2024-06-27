import { db } from '../db';

export const getLevels = async () => {
  const levels = await db.level.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  return levels;
};
