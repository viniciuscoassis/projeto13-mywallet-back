import express from "express";
import {
  getRegisters,
  RegisterNew,
} from "../Controllers/registerController.js";
import auth from "../Midlewares/auth.js";
import { validadeNewEntrance } from "../Midlewares/validateNewEntrance.js";

const registerRouter = express.Router();

registerRouter.use(auth);
registerRouter.get("/registers", getRegisters);
registerRouter.post("/registers", validadeNewEntrance, RegisterNew);

export default registerRouter;
