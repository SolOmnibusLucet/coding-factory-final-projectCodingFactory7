import Joi from 'joi';

export const taskEditSchema = Joi.object({
  newText: Joi.string().min(1).max(200).required()
});