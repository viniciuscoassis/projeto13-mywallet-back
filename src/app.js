import express from "express";
import cors from "cors";

import routes from "./Routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(5000, () => console.log("magic on 5000"));
