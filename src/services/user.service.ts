import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const findOrCreateUser = async (data: {
  uid: string;
  email: string;
  name?: string;
  photoUrl?: string;
  provider: string;
}) => {
  const existing = await prisma.user.findUnique({
    where: {
      uid: data.uid,
    },
  });
  if (existing) return existing;

  const user = await prisma.user.create({
    data,
  });
  return user;
};
