import { Joi } from "express-validation";

const eventsSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    distance: Joi.string().required(),
    type: Joi.string().required(),
    date: Joi.string().required(),
    description: Joi.string().max(500).required(),
    image: Joi.string(),
  }),
};

export default eventsSchema;
