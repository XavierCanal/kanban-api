const Task = require("../database/Task");
const { v4: uuid } = require("uuid");

const getAllTasks = () => {
    try {
      const allTasks = Task.getAllTasks();
      return allTasks;
    } catch (error) {
      throw error;
    }
  };


  const getTaskByTitle = (taskName) => {
    try {
      const task = Task.getTaskByTitle(taskName);
      return task;
    } catch (error) {
      throw error;
    }
  };


    module.exports = {
        getAllTasks,
        getTaskByTitle
    }