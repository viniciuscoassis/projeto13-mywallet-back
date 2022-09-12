import express from "express";
import authRouter from "./authRouter";
import registerRouter from "./registerRouter";

const routes = express.Router();

routes.use(authRouter);
routes.use(registerRouter);

export default routes;
