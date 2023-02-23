const express = require("express");
const taskController = require("../../controllers/taskController");

const router = express.Router();

router
  .get("/", taskController.getAllTasks)
  .get("/:taskName", taskController.getOneTask)
  .post("/", taskController.createNewTask)
  .patch("/:taskName", taskController.updateOneTask)
  .delete("/:taskName", taskController.deleteOneTask);

module.exports = router;