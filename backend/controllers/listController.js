import * as ListService from '../services/ListService.js';

export const getLists = async (req, res) => {
  try {
    const lists = await ListService.getUserLists(req.userId);
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createList = async (req, res) => {
  try {
    const { title, category } = req.body;
    const list = await ListService.createList({ title, category }, req.userId);
    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateList = async (req, res) => {
  try {
    const { title, category } = req.body;
    const list = await ListService.updateList(req.params.listId, { title, category }, req.userId);
    res.json(list);
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

export const deleteList = async (req, res) => {
  try {
    await ListService.deleteList(req.params.listId, req.userId);
    res.json({ message: 'List deleted successfully' });
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

export const getList = async (req, res) => {
  try {
    const list = await ListService.getListById(req.params.listId, req.userId);
    res.json(list);
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