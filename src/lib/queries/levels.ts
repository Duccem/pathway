import { db } from '../db';

export const getLevels = async () => {
  const levels = await db.level.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  return levels;
};

export const getLevel = async (id: string) => {
  const level = await db.level.findUnique({
    where: {
      id,
    },
  });
  return level;
};
