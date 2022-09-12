import express from "express";

import { signIn, signUp } from "../Controllers/authController.js";
import { validateLogin } from "../Midlewares/vaidateLogin.js";
import { validateNewUser } from "../Midlewares/validateNewUser.js";

const authRouter = express.Router();

authRouter.post("/sign-up", validateNewUser, signUp);
authRouter.post("/sign-in", validateLogin, signIn);

export default authRouter;
