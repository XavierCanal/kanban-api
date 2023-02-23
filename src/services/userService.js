const User = require("../database/User");
const { v4: uuid } = require("uuid");

const getAllUsers = () => {
    try {
      const allUsers = User.getAllUsers();
      return allUsers;
    } catch (error) {
      throw error;
    }
  };

  const createNewUser = (newUser) => {
    const userToInsert = {
      ...newUser,
      id: uuid(),
      createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    try {
      const createdUser = User.createNewUser(userToInsert);
      return createdUser;
    } catch (error) {
      throw error;
    }
  };

  const getTasksFromUser = (username, status, date) => {
    try {
      const tasks = User.getTasksFromUser(username, status, date);
      return tasks;
    } catch (error) {
      throw error;
    }
  };

    module.exports = {
        getAllUsers,
        createNewUser,
        getTasksFromUser
    }