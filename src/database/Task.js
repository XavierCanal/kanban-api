const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllTasks = () => {
    try {
      let tasks = DB.tasks;
      return tasks;
    } catch (error) {
      throw { status: 500, message: error };
    }
  };

const getTaskByTitle = (taskTitle) => {
    try {
      const task = DB.tasks.find((task) => task.title === taskTitle);
  
      if (!task) {
        throw {
          status: 400,
          message: `Can't find task with the name: '${taskTitle}'`,
        };
      }
  
      return task;
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };

  const createNewTask = (newTask) => {
    try {
      const userExists = DB.users.findIndex((user) => user.username === newTask.username) < -1;
      const isAlreadyAdded =
        DB.tasks.findIndex((task) => task.title === newTask.title) > -1;
  
      if (isAlreadyAdded) {
        throw {
          status: 400,
          message: `Task with the title '${newTask.title}' already exists`,
        };
      }

      if (userExists) {
        throw {
          status: 400,
          message: `Username '${newTask.username}' doesn't exist`,
        };
      }
  
      DB.tasks.push(newTask);
      saveToDatabase(DB);
  
      return newTask;
    } catch (error) {
      throw { status: 500, message: error?.message || error };
    }
  };


  const updateOneTask = (taskName, changes) => {
    try {
      const isAlreadyAdded =
        DB.tasks.findIndex((task) => task.title === changes.title) > -1;
  
      if (isAlreadyAdded) {
        throw {
          status: 400,
          message: `Task with the title '${changes.title}' already exists`,
        };
      }
  
      const indexForUpdate = DB.tasks.findIndex(
        (task) => task.title === taskName
      );
  
      if (indexForUpdate === -1) {
        throw {
          status: 400,
          message: `Can't find task with the title '${taskName}'`,
        };
      }
  
  
      DB.tasks[indexForUpdate] = changes;
      saveToDatabase(DB);
  
      return changes;
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };

  const deleteOneTask = (taskTitle) => {
    try {
      const indexForDeletion = DB.tasks.findIndex(
        (task) => task.title === taskTitle
      );
      if (indexForDeletion === -1) {
        throw {
          status: 400,
          message: `Can't find task with the title '${taskTitle}'`,
        };
      }
      DB.tasks.splice(indexForDeletion, 1);
      saveToDatabase(DB);
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };

  module.exports = {
    getAllTasks,
    getTaskByTitle,
    createNewTask,
    updateOneTask,
    deleteOneTask
  };