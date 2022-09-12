import express from "express";
import authRouter from "./authRouter.js";
import registerRouter from "./registerRouter.js";

const routes = express.Router();

routes.use(authRouter);
routes.use(registerRouter);

export default routes;
