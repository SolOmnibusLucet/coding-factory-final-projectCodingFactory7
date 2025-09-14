import * as TaskRepository from '../repositories/TaskRepository.js';
import * as ListRepository from '../repositories/ListRepository.js';

export const addTask = async (listId, taskText, userId) => {
 
  const list = await ListRepository.getListById(listId);
  if (!list) {
    throw new Error('List not found');
  }
  
  if (list.userId.toString() !== userId) {
    throw new Error('Unauthorized');
  }
  
  return await TaskRepository.addTask(listId, taskText);
};

export const toggleTaskCompletion = async (listId, taskIndex, userId) => {
  
  const list = await ListRepository.getListById(listId);
  if (!list) {
    throw new Error('List not found');
  }
  
  if (list.userId.toString() !== userId) {
    throw new Error('Unauthorized');
  }
  
  return await TaskRepository.toggleTaskCompletion(listId, taskIndex);
};

export const editTask = async (listId, taskIndex, newText, userId) => {
  
  const list = await ListRepository.getListById(listId);
  if (!list) {
    throw new Error('List not found');
  }
  
  if (list.userId.toString() !== userId) {
    throw new Error('Unauthorized');
  }
  
  return await TaskRepository.editTaskText(listId, taskIndex, newText);
};

export const deleteTask = async (listId, taskIndex, userId) => {
  
  const list = await ListRepository.getListById(listId);
  if (!list) {
    throw new Error('List not found');
  }
  
  if (list.userId.toString() !== userId) {
    throw new Error('Unauthorized');
  }
  
  return await TaskRepository.deleteTask(listId, taskIndex);
};

export const reorderTasks = async (listId, sourceIndex, destinationIndex, userId) => {

  const list = await ListRepository.getListById(listId);
  if (!list) {
    throw new Error('List not found');
  }
  
  if (list.userId.toString() !== userId) {
    throw new Error('Unauthorized');
  }
  
  return await TaskRepository.reorderTasks(listId, sourceIndex, destinationIndex);
};