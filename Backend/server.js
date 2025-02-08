const express = require("express");
const dotenv=require("dotenv");
const {chats}=require("./data/data");
const connectDB = require("./config/db");
const app = express();
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const {notFound,errorHandler}=require('./middleware/errorMiddleware')

dotenv.config();
connectDB();

app.use(express.json());  //To accept JSON data

app.get("/", (req, res) => {
  res.send("Api is running succesfully");
});

app.use("/api/user",userRoutes)
app.use("/api/chat",chatRoutes)
app.use("/api/message",messageRoutes)

app.use(notFound)
app.use(errorHandler)

const port= process.env.PORT || 5000;

app.listen(port, console.log(`Server is running on port ${port}`));
