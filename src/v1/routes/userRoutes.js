const express = require("express");
const userController = require("../../controllers/userController");

const router = express.Router();

router
  .get("/", userController.getAllUsers)
  .post("/", userController.createNewUser)
  .get("/:username/tasks", userController.getTasksFromUser)
//   .get("/:productName", productController.getOneProduct)
//   
//   .patch("/:productName", productController.updateOneProduct)
//   .delete("/:productName", productController.deleteOneProduct);

module.exports = router;
