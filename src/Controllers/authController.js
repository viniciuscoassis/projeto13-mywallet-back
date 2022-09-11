import { db } from "../db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import joi from "joi";

const userSchema = joi.object({
  email: joi.required(),
  password: joi.required(),
});

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

async function signUp(req, res) {
  const newUser = req.body;

  const { error, value } = newUserSchema.validate(newUser, {
    abortEarly: false,
  });
  if (error) {
    res.status(400).send(error.details.map((value) => value.message));
  }

  const repetido = await db
    .collection("users")
    .findOne({ email: newUser.email });
  if (repetido) return res.status(409).send("Email já cadastrado");

  try {
    await db.collection("users").insertOne({
      ...newUser,
      password: bcrypt.hashSync(newUser.password, 10),
    });

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function signIn(req, res) {
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
      const token = uuid();

      await db.collection("sessions").insertOne({ token, userId: user._id });

      delete user.password;
      delete user._id;
      res.status(201).send({ token, user });
    } else {
      return res.status(401).send("email ou senha inválidos");
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

export { signUp, signIn };
