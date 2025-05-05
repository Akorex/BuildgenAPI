import express, { type Router } from "express";
import UserController from "./auth.controller";

export const authRouter: Router = express.Router();

authRouter.post("/create-user", UserController.createUser);

export default authRouter;
