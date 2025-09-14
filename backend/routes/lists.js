import express from 'express';
import {
  getLists,
  createList,
  updateList,
  deleteList,
  getList
} from '../controllers/listController.js';

import {
  addTask,
  toggleTask,
  editTask,
  deleteTask,
  reorderTasks
} from '../controllers/taskController.js';

import { listSchema } from '../dto/ListDTO.js';
import { taskCreateSchema } from '../dto/TaskCreateDTO.js';
import { taskEditSchema } from '../dto/TaskEditDTO.js';
import { taskReorderSchema } from '../dto/TaskReorderDTO.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

router.use(verifyToken);

const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      message: 'Validation error',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

router.get('/', getLists);
router.get('/:listId', getList);
router.post('/', validateRequest(listSchema), createList);
router.put('/:listId', validateRequest(listSchema), updateList);
router.delete('/:listId', deleteList);

router.post('/:listId/tasks', validateRequest(taskCreateSchema), addTask);
router.put('/:listId/tasks/:taskIndex/toggle', toggleTask);
router.put('/:listId/tasks/:taskIndex', validateRequest(taskEditSchema), editTask);
router.delete('/:listId/tasks/:taskIndex', deleteTask);
router.put('/:listId/tasks/reorder', validateRequest(taskReorderSchema), reorderTasks);

export default router;