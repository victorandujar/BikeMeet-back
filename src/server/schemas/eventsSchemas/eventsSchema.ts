import { Joi } from "express-validation";

const eventsSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    distance: Joi.number().required(),
    type: Joi.string().required(),
    date: Joi.date().required(),
    description: Joi.string().max(500).required(),
    image: Joi.string(),
  }),
};

export default eventsSchema;
