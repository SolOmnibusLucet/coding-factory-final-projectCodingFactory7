import List from '../models/List.js';

export const toggleTaskCompletion = async (listId, taskIndex) => {
  const list = await List.findById(listId);
  if (!list || !list.tasks[taskIndex]) {
    throw new Error('List or task not found');
  }
  list.tasks[taskIndex].completed = !list.tasks[taskIndex].completed;
  return await list.save();
};

export const editTaskText = async (listId, taskIndex, newText) => {
  const list = await List.findById(listId);
  if (!list || !list.tasks[taskIndex]) {
    throw new Error('List or task not found');
  }
  list.tasks[taskIndex].text = newText;
  return await list.save();
};

export const reorderTasks = async (listId, sourceIndex, destinationIndex) => {
  const list = await List.findById(listId);
  if (!list) {
    throw new Error('List not found');
  }
  
  if (sourceIndex < 0 || sourceIndex >= list.tasks.length || 
      destinationIndex < 0 || destinationIndex >= list.tasks.length) {
    throw new Error('Invalid task indices');
  }
  
  const [moved] = list.tasks.splice(sourceIndex, 1);
  list.tasks.splice(destinationIndex, 0, moved);
  return await list.save();
};

export const addTask = async (listId, taskText) => {
  const list = await List.findById(listId);
  if (!list) {
    throw new Error('List not found');
  }
  
  list.tasks.push({ text: taskText, completed: false });
  return await list.save();
};

export const deleteTask = async (listId, taskIndex) => {
  const list = await List.findById(listId);
  if (!list || !list.tasks[taskIndex]) {
    throw new Error('List or task not found');
  }
  
  list.tasks.splice(taskIndex, 1);
  return await list.save();
};