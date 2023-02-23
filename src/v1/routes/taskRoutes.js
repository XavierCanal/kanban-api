const express = require("express");
const taskController = require("../../controllers/taskController");

const router = express.Router();

router
  .get("/", taskController.getAllTasks)
  .get("/:taskName", taskController.getOneTask)
  .post("/", taskController.createNewTask)
//   
//   .patch("/:productName", productController.updateOneProduct)
//   .delete("/:productName", productController.deleteOneProduct);

module.exports = router;