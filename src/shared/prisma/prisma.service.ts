
import { FindOrCreateUserInput } from '../../features/auth';
import { prisma } from './prisma.setup';



export const findOrCreateUser = async (data: FindOrCreateUserInput) => {
  const existing = await prisma.user.findUnique({
    where: { uid: data.uid },
  });

  if (existing) return existing;

  const user = await prisma.user.create({ data });
  return user;
};
