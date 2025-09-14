import * as ListDAO from '../dao/ListDAO.js';

export const createList = async (listData) => {
  return await ListDAO.createList(listData);
};

export const getListsByUser = async (userId) => {
  return await ListDAO.getListsByUser(userId);
};

export const updateList = async (listId, updates) => {
  return await ListDAO.updateList(listId, updates);
};

export const deleteList = async (listId) => {
  return await ListDAO.deleteList(listId);
};

export const getListById = async (listId) => {
  return await ListDAO.getListById(listId);
};