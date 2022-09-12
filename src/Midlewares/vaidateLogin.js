import joi from "joi";

const userSchema = joi.object({
  email: joi.required(),
  password: joi.required(),
});

async function validateLogin(req, res, next) {
  const { email, password } = req.body;

  const { error, value } = userSchema.validate(
    { email, password },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).send(error.details.map((value) => value.message));
  }
  next();
}
export { validateLogin };
