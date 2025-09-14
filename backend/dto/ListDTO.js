import Joi from 'joi';

export const listSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  category: Joi.string().max(50).allow('')
});
