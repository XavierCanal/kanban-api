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

  const createNewTask = (newTask) => {
    const taskToInsert = {
      ...newTask,
      id: uuid(),
      createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    try {
      const createdTask = Task.createNewTask(taskToInsert);
      return createdTask;
    } catch (error) {
      throw error;
    }
  };

  const updateOneTask = (taskName, changes) => {
    try {
      const updatedTask = Task.updateOneTask(taskName, changes);
      return updatedTask;
    } catch (error) {
      throw error;
    }
  };

  const deleteOneTask = (taskName) => {
    try {
      Task.deleteOneTask(taskName);
    } catch (error) {
      throw error;
    }
  };

    module.exports = {
        getAllTasks,
        getTaskByTitle,
        createNewTask,
        updateOneTask,
        deleteOneTask
    }