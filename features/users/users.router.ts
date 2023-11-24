// routes/userRoutes.ts
import { Router } from "express";
import { authenticateToken } from "../../middlewares/auth";
import usersController from "./users.controller";

const userRouter = Router();

userRouter.post("/login", usersController.login);
userRouter.post("/register", usersController.register);
userRouter.get("/profile", authenticateToken, usersController.profile);

export default userRouter;
