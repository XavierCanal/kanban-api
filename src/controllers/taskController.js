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
      !body.user ||
      !body.title ||
      !body.description ||
      !body.status
    ) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'user', 'title', 'description', 'status'",
        },
      });
    }
  
    const newTask = {
      user: body.user,
      title: body.title,
      description: body.description,
      status: body.status
    };
  
    try {
      const createdTask = taskService.createNewTask(newTask);
      res.status(201).send({ status: "OK", data: createdTask });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILDED", data: { error: error?.message || error } });
    }
  };

  const updateOneTask = (req, res) => {
    const {
      body,
      params: { taskName },
    } = req;
  
    if (!taskName) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':productName' can not be empty" },
      });
    }
  
    try {
      const updatedTask = taskService.updateOneTask(taskName, body);
      res.send({ status: "OK", data: updatedTask });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };

  const deleteOneTask = (req, res) => {
    const {
      params: { taskName },
    } = req;
  
    if (!taskName) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':taskName' can not be empty" },
      });
    }
  
    try {
      taskService.deleteOneTask(taskName);
      res.status(204).send({ status: "OK" });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };

  module.exports = {
    getAllTasks,
    getOneTask,
    createNewTask,
    updateOneTask,
    deleteOneTask
  };
  