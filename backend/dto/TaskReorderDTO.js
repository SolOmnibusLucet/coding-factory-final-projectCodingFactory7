import Joi from 'joi';

export const taskReorderSchema = Joi.object({
  sourceIndex: Joi.number().integer().min(0).required(),
  destinationIndex: Joi.number().integer().min(0).required()
});
