import { prisma } from "../db/database.js";
import { validate } from "../validation/validation.js";
import psikologValidation from "../validation/psikolog.validation.js";
import { ResponseError } from "../error/error-handling.js";

const create = async (req) => {
  const psikolog = validate(psikologValidation.createValidation, req);

  const countPsikolog = await prisma.psikolog.count({
    where: {
      email: psikolog.email,
    },
  });

  if (countPsikolog > 0) {
    throw new ResponseError(400, "psikolog already exists");
  }

  return prisma.psikolog.create({
    data: psikolog,
    select: {
      email: true,
      name: true,
      keahlian: true,
    },
  });
};

const getAll = async () => {
  return prisma.psikolog.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      keahlian: true,
    },
  });
};

const update = async (req, id) => {
  const psikolog = validate(psikologValidation.updateValidation, req);

  const countPsi = await prisma.psikolog.count({
    where: {
      id: id,
    },
  });

  if (countPsi === 0) {
    throw new ResponseError(404, "psikolog not found");
  }

  const data = {};

  if (psikolog.email) data.email = psikolog.email;
  if (psikolog.name) data.name = psikolog.name;
  if (psikolog.keahlian) data.keahlian = psikolog.keahlian;

  return prisma.psikolog.update({
    where: {
      id: id,
    },
    data: data,
    select: {
      email: true,
      name: true,
      keahlian: true,
    },
  });
};

const deletePsi = async (id) => {
  const countPsi = await prisma.psikolog.count({
    where: {
      id: id,
    },
  });

  if (countPsi === 0) {
    throw new ResponseError(404, "psikolog not found");
  }

  return prisma.psikolog.delete({
    where: {
      id: id,
    },
  });
};

const getOne = async (id) => {
  const countPsi = await prisma.psikolog.count({
    where: {
      id: id,
    },
  });

  if (countPsi === 0) {
    throw new ResponseError(404, "psikolog not found");
  }

  return prisma.psikolog.findUnique({
    where: {
      id: id,
    },
    select: {
      email: true,
      name: true,
      keahlian: true,
    },
  });
};

export default {
  create,
  getAll,
  update,
  deletePsi,
  getOne,
};
