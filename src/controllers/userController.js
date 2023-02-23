const userService = require("../services/userService");

const getAllUsers = (req, res) => {
    try {
      const allUsers = userService.getAllUsers();
      res.send({ status: "OK", data: allUsers });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };

  const createNewUser = (req, res) => {
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

  const getTasksFromUser = (req, res) => {
    const {
      params: { username },
    } = req;
    const status = req.query.status;
    const date = req.query.date;
    if (!username) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':username' can not be empty" },
      });
      return;
    }
  
    try {
      const tasks = userService.getTasksFromUser(username, status, date);
      res.send({ status: "OK", data: tasks });
    } catch (error) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };

  module.exports = {
    getAllUsers,
    createNewUser,
    getTasksFromUser
  };
  