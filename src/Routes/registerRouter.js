import express from "express";
import {
  getRegisters,
  RegisterNew,
} from "../Controllers/registerController.js";

const registerRoute = express.Router();

registerRoute.get("/registers", getRegisters);
registerRoute.post("/registers", RegisterNew);

export default registerRoute;
