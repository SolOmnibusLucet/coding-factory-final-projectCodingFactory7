import * as ListRepository from '../repositories/ListRepository.js';

export const createList = async (listData, userId) => {
  const newList = {
    ...listData,
    userId,
    tasks: []
  };
  
  return await ListRepository.createList(newList);
};

export const getUserLists = async (userId) => {
  return await ListRepository.getListsByUser(userId);
};

export const updateList = async (listId, updates, userId) => {
 
  const list = await ListRepository.getListById(listId);
  if (!list) {
    throw new Error('List not found');
  }
  
  if (list.userId.toString() !== userId) {
    throw new Error('Unauthorized');
  }
  
  return await ListRepository.updateList(listId, updates);
};

export const deleteList = async (listId, userId) => {
  
  const list = await ListRepository.getListById(listId);
  if (!list) {
    throw new Error('List not found');
  }
  
  if (list.userId.toString() !== userId) {
    throw new Error('Unauthorized');
  }
  
  return await ListRepository.deleteList(listId);
};

export const getListById = async (listId, userId) => {
  const list = await ListRepository.getListById(listId);
  if (!list) {
    throw new Error('List not found');
  }
  
  if (list.userId.toString() !== userId) {
    throw new Error('Unauthorized');
  }
  
  return list;
};