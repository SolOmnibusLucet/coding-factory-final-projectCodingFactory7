import User from '../models/User.js';

export const createUser = async (data) => {
  return new User(data).save();
};

export const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

export const findUserById = async (id) => {
  return User.findById(id);
};
