import { prisma } from "../db/database.js";
import { validate } from "../validation/validation.js";
import userValidation from "../validation/user.validation.js";
import { ResponseError } from "../error/error-handling.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req) => {
  const user = validate(userValidation.signupValidation, req);

  const countUser = await prisma.user.count({
    where: {
      email: user.email,
    },
  });

  if (countUser > 0) {
    throw new ResponseError(400, "user already exists");
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prisma.user.create({
    data: user,
    select: {
      email: true,
      name: true,
      password: true,
      role: true,
    },
  });
};

const signin = async (req) => {
  const login = validate(userValidation.signinValidation, req);

  const user = await prisma.user.findUnique({
    where: {
      email: login.email,
    },
  });

  if (!user) throw new ResponseError(400, "username or password is invalid");

  const isValidPassword = await bcrypt.compare(login.password, user.password);

  if (!isValidPassword)
    throw new ResponseError(400, "username or password is invalid");

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  return token;
};

const currentUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      email: true,
      name: true,
      role: true,
    },
  });

  return user;
};

const logout = async (req) => {};

const update = async (req, id) => {
  const user = validate(userValidation.updateValidation, req);

  const countUser = await prisma.user.count({
    where: {
      id: id,
    },
  });

  if (countUser != 1) throw new ResponseError(404, "user not found");

  const data = {};

  if (user.email) data.email = user.email;
  if (user.name) data.name = user.name;
  if (user.password) data.password = await bcrypt.hash(user.password, 10);
  if (user.role) data.role = user.role;

  const update = await prisma.user.update({
    where: {
      id: id,
    },
    data: data,
    select: {
      email: true,
      name: true,
      role: true,
    },
  });

  return update;
};

const getAll = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });
};

export default {
  signup,
  signin,
  currentUser,
  logout,
  update,
  getAll,
};
