import express from "express";
import cors from "cors";
import { getRegisters, RegisterNew } from "./Controllers/registerController.js";
import { signIn, signUp } from "./Controllers/authController.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/sign-up", signUp);

app.post("/sign-in", signIn);

app.get("/registers", getRegisters);

app.post("/registers", RegisterNew);

app.listen(5000, () => console.log("magic on 5000"));
