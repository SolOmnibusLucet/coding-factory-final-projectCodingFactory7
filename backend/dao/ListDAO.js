import List from '../models/List.js';

export const createList = async (data) => {
  const list = new List(data);
  return await list.save();
};

export const getListsByUser = async (userId) => {
  return await List.find({ userId }).sort({ createdAt: -1 });
};

export const updateList = async (listId, updates) => {
  return await List.findByIdAndUpdate(listId, updates, { new: true });
};

export const deleteList = async (listId) => {
  return await List.findByIdAndDelete(listId);
};

export const getListById = async (listId) => {
  return await List.findById(listId);
};

export const getListByIdAndUser = async (listId, userId) => {
  return await List.findOne({ _id: listId, userId });
};