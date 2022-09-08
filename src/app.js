import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import joi from "joi";
import dayjs from "dayjs";

dotenv.config();
const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

mongoClient.connect().then(() => {
  db = mongoClient.db("myWallet");
});

const app = express();

app.use(cors());
app.use(express.json());

const newEntranceSchema = joi.object({
  value: joi.number().required(),
  description: joi.string().required(),
  type: joi.valid("in", "out").required(),
});

app.get("/", async (req, res) => {
  await db.collection("teste").insertOne({ name: "VInicius" });
  res.send("OK");
});

app.get("/getRegisters", async (req, res) => {
  const registros = await db.collection("registers").find({}).toArray();
  res.send(registros);
});

app.post("/register", async (req, res) => {
  let { value, description, type } = req.body;
  value = Number(value);
  const validation = newEntranceSchema.validate(
    { value, description, type },
    { abortEarly: false }
  );

  if (validation.error) {
    return res
      .status(400)
      .send(validation.error.details.map((value) => value.message));
  }

  await db
    .collection("registers")
    .insertOne({ value, description, type, date: dayjs().format("DD/MM") });
  return res.sendStatus(201);
});
app.post("/newOut", (req, res) => {});

app.listen(5000, () => console.log("magic on 5000"));
