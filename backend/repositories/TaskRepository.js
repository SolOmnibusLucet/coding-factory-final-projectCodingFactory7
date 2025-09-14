import * as TaskDAO from '../dao/TaskDAO.js';

export const toggleTaskCompletion = async (listId, taskIndex) => {
  return await TaskDAO.toggleTaskCompletion(listId, taskIndex);
};

export const editTaskText = async (listId, taskIndex, newText) => {
  return await TaskDAO.editTaskText(listId, taskIndex, newText);
};

export const reorderTasks = async (listId, sourceIndex, destinationIndex) => {
  return await TaskDAO.reorderTasks(listId, sourceIndex, destinationIndex);
};

export const addTask = async (listId, taskText) => {
  return await TaskDAO.addTask(listId, taskText);
};

export const deleteTask = async (listId, taskIndex) => {
  return await TaskDAO.deleteTask(listId, taskIndex);
};