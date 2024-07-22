const express = require("express");
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 4001;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const todoRoutes = require('./routes/TodoRoutes');
const userRoutes = require('./routes/UserRoutes');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/todo", todoRoutes);
app.use("/todo", userRoutes);

mongoose
    .connect("mongodb://127.0.0.1:27017/tododb")
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.error("Error connecting to database"));

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
