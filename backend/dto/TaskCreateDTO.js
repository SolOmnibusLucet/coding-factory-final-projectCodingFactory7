import Joi from 'joi';

export const taskCreateSchema = Joi.object({
  text: Joi.string().min(1).max(200).required()
});
