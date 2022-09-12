import express from "express";

import { signIn, signUp } from "../Controllers/authController.js";
import { validateNewUser } from "../Midlewares/validateNewUser.js";

const authRouter = express.Router();

authRouter.post("/sign-up", validateNewUser, signUp);
authRouter.post("/sign-in", signIn);

export default authRouter;
