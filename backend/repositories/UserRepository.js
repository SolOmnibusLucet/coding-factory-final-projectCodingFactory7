import * as UserDAO from '../dao/UserDAO.js';

export const registerUser = async (userData) => {
  return await UserDAO.createUser(userData);
};

export const getUserByEmail = async (email) => {
  return await UserDAO.findUserByEmail(email);
};

export const getUserById = async (id) => {
  return await UserDAO.findUserById(id);
};
