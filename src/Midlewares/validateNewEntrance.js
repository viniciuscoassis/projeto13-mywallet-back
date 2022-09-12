import joi from "joi";

const newEntranceSchema = joi.object({
  value: joi.number().required(),
  description: joi.string().required(),
  type: joi.valid("in", "out").required(),
});

async function validadeNewEntrance(req, res, next) {
  let { value, description, type } = req.body;
  value = Number(value);
  const validation = newEntranceSchema.validate(
    { value, description, type },
    { abortEarly: false }
  );

  if (validation.error) {
    return res
      .status(422)
      .send(validation.error.details.map((value) => value.message));
  }
  next();
}

export { validadeNewEntrance };
