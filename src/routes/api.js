import express from "express";
import userController from "../controller/user.controller.js";
import psikologController from "../controller/psikolog.controller.js";

import {
  authMiddleware,
  adminMiddleware,
} from "../middleware/auth.middleware.js";

const userRouter = new express.Router();
const psikologRouter = new express.Router();

userRouter.use(authMiddleware);

userRouter.get("/user/me", userController.currentUser);
userRouter.delete("/logout", userController.logout);
userRouter.patch("/user", userController.update);
userRouter.get("/user", adminMiddleware, userController.getAll);

psikologRouter.use(authMiddleware, adminMiddleware);

psikologRouter.post("/psikolog", psikologController.create);
psikologRouter.patch(
  "/psikolog/:id",
  adminMiddleware,
  psikologController.update
);
psikologRouter.delete(
  "/psikolog/:id",
  adminMiddleware,
  psikologController.deletePsi
);

export { userRouter, psikologRouter };
