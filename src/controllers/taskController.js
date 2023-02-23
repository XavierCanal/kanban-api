const taskService = require("../services/taskService");

const getAllTasks = (req, res) => {
    try {
      const allTasks = taskService.getAllTasks();
      res.send({ status: "OK", data: allTasks });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };

  const getOneTask = (req, res) => {
    const {
      params: { taskName },
    } = req;
  
    if (!taskName) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':taskName' can not be empty" },
      });
      return;
    }
  
    try {
      const task = taskService.getTaskByTitle(taskName);
      res.send({ status: "OK", data: task });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };

  const createNewTask = (req, res) => {
    const { body } = req;
  
    if (
      !body.username ||
      !body.fullName 
    ) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'id', 'username', 'fullName'",
        },
      });
    }
  
    const newUser = {
      username: body.username,
      fullName: body.fullName
    };
  
    try {
      const createdUser = userService.createNewUser(newUser);
      res.status(201).send({ status: "OK", data: createdUser });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILDED", data: { error: error?.message || error } });
    }
  };

  module.exports = {
    getAllTasks,
    getOneTask,
    createNewTask
  };
  