import express from "express";
import cors from "cors";
import joi from "joi";
import { getRegisters, RegisterNew } from "./Controllers/registerController.js";
import { db } from "./db.js";
import bcrypt from "bcrypt";

const app = express();

app.use(cors());
app.use(express.json());

const newUserSchema = joi.object({
  name: joi.string().required(),
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

const userSchema = joi.object({
  email: joi.required(),
  password: joi.required(),
});

app.post("/sign-up", async (req, res) => {
  const newUser = req.body;

  const { error, value } = newUserSchema.validate(newUser, {
    abortEarly: false,
  });
  if (error) {
    res.status(400).send(error.details.map((value) => value.message));
  }

  try {
    await db.collection("users").insertOne({
      ...newUser,
      password: bcrypt.hashSync(newUser.password, 10),
    });

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  const { error, value } = userSchema.validate(
    { email, password },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).send(error.details.map((value) => value.message));
  }
  try {
    const user = await db.collection("users").findOne({ email });

    let equalPassoword = bcrypt.compareSync(password, user.password);
    if (user && equalPassoword) {
    } else {
      return res.status(401).send("email ou senha inválidos");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/registers", getRegisters);

app.post("/registers", RegisterNew);

app.listen(5000, () => console.log("magic on 5000"));
