const express = require("express");
const dotenv=require("dotenv");
const {chats}=require("./data/data");
const connectDB = require("./config/db");
const app = express();
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const {notFound,errorHandler}=require('./middleware/errorMiddleware')
const path=require('path')

dotenv.config();
connectDB();

app.use(express.json());  //To accept JSON data

app.get("/", (req, res) => {
  res.send("Api is running succesfully");
});

app.use("/api/user",userRoutes)
app.use("/api/chat",chatRoutes)
app.use("/api/message",messageRoutes)


// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------


app.use(notFound)
app.use(errorHandler)

const port= process.env.PORT || 6000;

const server =app.listen(port, console.log(`Server is running on port ${port}`));

const io=require('socket.io')(server,{
  pingTimeout:60000,
  cors:{
    origin:"http://localhost:3000",
  }
})

io.on("connection",(socket)=>{
  console.log("Connected to socket.io");

  socket.on("setup",(userData)=>{
    socket.join(userData._id);
    console.log("socket connected");
    
  })

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });


  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });

})