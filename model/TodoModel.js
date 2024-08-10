const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    todo: {
      type: String,
    },
    isFinished: {
      type: Boolean,
      default: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  });
  
//  basic date format
//   function setDateValue() {
//     const date = new Date()
//     const day = date.getDate()
//     const month = date.toLocaleString("default", {month: "long"})
//     const year = date.getFullYear()

//     return `${month} ${day},${year}`
//   }




const Todo = mongoose.model('Todo', todoSchema)


module.exports = Todo