import prisma from "../config/prisma.js";

export const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const findUserById = async (id) => {
  return prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
};

export const createUser = async ({ name, email, password, role }) => {
  return prisma.user.create({
    data: {
      name,
      email,
      password,
      role,
    },
  });
};
