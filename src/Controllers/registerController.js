import { db } from "../db.js";

import dayjs from "dayjs";

async function getRegisters(req, res) {
  const session = res.locals.session;

  const registros = await db
    .collection("registers")
    .find({ userId: session.userId })
    .toArray();
  return res.send(registros);
}

async function RegisterNew(req, res) {
  let session = res.locals.session;
  let { value, description, type } = req.body;
  value = Number(value);

  await db.collection("registers").insertOne({
    value,
    description,
    type,
    date: dayjs().format("DD/MM"),
    userId: session.userId,
  });
  return res.sendStatus(201);
}

export { getRegisters, RegisterNew };
