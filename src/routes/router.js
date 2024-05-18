import express from "express";
import userController from "../controller/user.controller.js";
import psikologController from "../controller/psikolog.controller.js";

const router = new express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("/psikolog", psikologController.getAll);
router.get("/psikolog/:id", psikologController.getOne);

export { router };
