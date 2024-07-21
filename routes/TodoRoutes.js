const express = require('express')

const router = express.Router();

const todoController = require('../controller/TodoController')
const verifyUser = require('../middleware/checkAuth')

router.get("/all/task", verifyUser.verifyToken,todoController.getTask)
router.post("/add/task", verifyUser.verifyToken,todoController.createTask)
router.post("/update", todoController.updateTask)
router.post("/delete", todoController.deleteTask)


module.exports = router
