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
          message: `Can't find product with the name: '${taskTitle}'`,
        };
      }
  
      return task;
    } catch (error) {
      throw { status: error?.status || 500, message: error?.message || error };
    }
  };

  module.exports = {
    getAllTasks,
    getTaskByTitle
  };