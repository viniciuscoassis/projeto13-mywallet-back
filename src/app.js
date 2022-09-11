import express from "express";
import cors from "cors";
import authRouter from "./Routes/authRouter.js";
import registerRoute from "./Routes/registerRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(registerRoute);

app.listen(5000, () => console.log("magic on 5000"));
