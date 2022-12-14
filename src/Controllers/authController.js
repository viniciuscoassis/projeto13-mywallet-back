import { db } from "../db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

async function signUp(req, res) {
  const newUser = req.body;

  delete newUser.confirmPassword;
  try {
    await db.collection("users").insertOne({
      ...newUser,
      password: bcrypt.hashSync(newUser.password, 10),
    });

    return res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
    return;
  }
}

async function signIn(req, res) {
  const { email, password } = req.body;

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
