import psikologService from "../service/psikolog.service.js";

const create = async (req, res, next) => {
  try {
    const result = await psikologService.create(req.body);
    res.status(201).json({
      data: result,
      message: "psikolog created",
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await psikologService.getAll();
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await psikologService.update(req.body, req.params.id);
    res.status(200).json({
      data: result,
      message: "psikolog updated",
    });
  } catch (error) {
    next(error);
  }
};

const deletePsi = async (req, res, next) => {
  try {
    const result = await psikologService.deletePsi(req.params.id);
    res.status(200).json({
      data: result,
      message: "psikolog deleted",
    });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const result = await psikologService.getOne(req.params.id);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  getAll,
  update,
  deletePsi,
  getOne,
};
