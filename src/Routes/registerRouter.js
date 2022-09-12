import express from "express";
import {
  getRegisters,
  RegisterNew,
} from "../Controllers/registerController.js";
import auth from "../Midlewares/auth.js";
import { validadeNewEntrance } from "../Midlewares/validateNewEntrance.js";

const registerRoute = express.Router();

registerRoute.use(auth);
registerRoute.get("/registers", getRegisters);
registerRoute.post("/registers", validadeNewEntrance, RegisterNew);

export default registerRoute;
