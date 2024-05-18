import userService from "../service/user.service.js";
import jwt from "jsonwebtoken";

const signup = async (req, res, next) => {
  try {
    const result = await userService.signup(req.body);
    res.status(201).json({
      data: result,
      message: "user created",
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const result = await userService.signin(req.body);

    res.cookie("jwt", result, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      data: result,
      message: `login success as ${req.body.email}`,
    });
  } catch (error) {
    next(error);
  }
};

const currentUser = async (req, res, next) => {
  try {
    const user = req.user.id;
    const result = await userService.currentUser(user);
    res.status(200).json({
      data: result,
      message: `you are logged in as ${result.email}`,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "unauthenticated user",
      });
    }

    res.clearCookie("jwt");
    res.status(200).json({
      message: "logout successfully",
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.user.id;
    const result = await userService.update(req.body, id);

    res.status(200).json({
      data: result,
      message: "user updated",
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await userService.getAll();

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  signup,
  signin,
  currentUser,
  logout,
  update,
  getAll,
};
