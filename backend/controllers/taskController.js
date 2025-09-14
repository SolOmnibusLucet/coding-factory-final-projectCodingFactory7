import * as TaskService from '../services/TaskService.js';

export const addTask = async (req, res) => {
  try {
    const { text } = req.body;
    const list = await TaskService.addTask(req.params.listId, text, req.userId);
    res.status(201).json(list);
  } catch (error) {
    if (error.message === 'List not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Unauthorized') {
      return res.status(403).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const toggleTask = async (req, res) => {
  try {
    const taskIndex = parseInt(req.params.taskIndex);
    const list = await TaskService.toggleTaskCompletion(req.params.listId, taskIndex, req.userId);
    res.json(list);
  } catch (error) {
    if (error.message === 'List not found' || error.message === 'List or task not found') {
      return res.status(404).json({ message: 'List or task not found' });
    }
    if (error.message === 'Unauthorized') {
      return res.status(403).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const editTask = async (req, res) => {
  try {
    const { newText } = req.body;
    const taskIndex = parseInt(req.params.taskIndex);
    const list = await TaskService.editTask(req.params.listId, taskIndex, newText, req.userId);
    res.json(list);
  } catch (error) {
    if (error.message === 'List not found' || error.message === 'List or task not found') {
      return res.status(404).json({ message: 'List or task not found' });
    }
    if (error.message === 'Unauthorized') {
      return res.status(403).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskIndex = parseInt(req.params.taskIndex);
    const list = await TaskService.deleteTask(req.params.listId, taskIndex, req.userId);
    res.json(list);
  } catch (error) {
    if (error.message === 'List not found' || error.message === 'List or task not found') {
      return res.status(404).json({ message: 'List or task not found' });
    }
    if (error.message === 'Unauthorized') {
      return res.status(403).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const reorderTasks = async (req, res) => {
  try {
    const { sourceIndex, destinationIndex } = req.body;
    const list = await TaskService.reorderTasks(req.params.listId, sourceIndex, destinationIndex, req.userId);
    res.json(list);
  } catch (error) {
    if (error.message === 'List not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Unauthorized') {
      return res.status(403).json({ message: error.message });
    }
    if (error.message === 'Invalid task indices') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};