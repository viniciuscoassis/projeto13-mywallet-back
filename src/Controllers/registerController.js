import { db } from "../db.js";
import joi from "joi";
import dayjs from "dayjs";

const newEntranceSchema = joi.object({
  value: joi.number().required(),
  description: joi.string().required(),
  type: joi.valid("in", "out").required(),
});

async function getRegisters(req, res) {
  const registros = await db.collection("registers").find({}).toArray();
  res.send(registros);
}

async function RegisterNew(req, res) {
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
}

export { getRegisters, RegisterNew };
