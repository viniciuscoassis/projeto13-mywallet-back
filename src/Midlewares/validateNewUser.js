import joi from "joi";
import { db } from "../db.js";

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
  confirmPassword: joi.any().valid(joi.ref("password")).required(),
});

async function validateNewUser(req, res, next) {
  const newUser = req.body;

  const { error, value } = newUserSchema.validate(newUser, {
    abortEarly: false,
  });
  if (error) {
    return res.status(422).send(error.details.map((value) => value.message));
  }

  const repetido = await db
    .collection("users")
    .findOne({ email: newUser.email });
  if (repetido) return res.status(409).send("Email já cadastrado");
  next();
}

export { validateNewUser };
