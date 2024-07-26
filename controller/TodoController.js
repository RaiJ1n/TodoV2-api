const Todo = require ('../model/TodoModel')
const User = require('../model/UserModel')

exports.createTask = async (req, res) => {
    console.log(req.user.email)
    const {todo, email} = req.body

    try {
        const getCurrentUser = await User.findOne ({email: req.user.email})
        console.log(getCurrentUser)

        const newTask = new Todo({
            todo: todo,
        })
        await newTask.save()
        getCurrentUser.taskList.push(newTask)
        await getCurrentUser.save()
        res.status(200).json({
            content: newTask,
            message: "Tasked created successfully"
        })
    } catch (err) {
        res.status(403).json({
            status: "Failed",
            content: err.message
        });
    }
}

exports.getTask = async (req, res) => {
    console.log(req.user.email);
    try {
      const getAllTask = await User.findOne({ email: req.user.email })
        .populate("taskList")
        .exec();
  
      if (getAllTask.taskList.length == 0) {
        return res.sendStatus(204);
      }
      res.status(200).json({
        message:"This is your tasks",
        content: getAllTask.taskList,
      });
    } catch (err) {
      res.status(400).json({
        content: err,
      });
    }
};

exports.updateTask = async (req, res) => {
    const todoId = req.params.id;
    const { todo } = req.body;

    try {
        const updateTask = await Todo.findByIdAndUpdate(
            todoId,
            { todo: todo },
            {
                runValidators: true,
                new: true,
            }
        );

        console.log(updateTask);

        if (updateTask) {
            return res.status(200).json({
                status: "Successfully Changed",
                content: updateTask,
            });
        }

        return res.status(204).json({
            message: "Task not found",
        });
    } catch (err) {
        return res.status(404).json({
            message: "Internal server error", err,
        });
    }
};


exports.deleteTask = async (req, res) => {
    const todoid = req.params.id;

    try {
        const getCurrentUser = await User.findOne({ email: req.user.email });

        if (!getCurrentUser) {
            return res.status(204).json({
                message: "User not found",
            });
        }

        getCurrentUser.taskList = getCurrentUser.taskList.filter(
            (taskId) => taskId.toString() !== todoid
        );
        
        


        const deletedTask = await Todo.findByIdAndDelete(todoid);

        if (!deletedTask) {
            return res.status(203).json({
                message: "Task not found",
            });
        }

        res.status(200).json({
            status: "Successfully Deleted",
            content: deletedTask,
        });
    } catch (err) {
        return res.status(404).json({
            message: "Internal server error",
            content: err.message,
        });
    }
};