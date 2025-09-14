import Joi from 'joi';

export const taskSchema = Joi.object({
  text: Joi.string().min(1).max(200).required()
});
