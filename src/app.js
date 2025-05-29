const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
const dotenv = require("dotenv");
dotenv.config({});
const cors = require("cors");
const http = require("http");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

//routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/api", chatRouter);

const server = http.createServer(app);
initializeSocket(server);

//database connect before server
connectDB().then(() => {
  try {
    server.listen(process.env.PORT, () => {
      console.log(`Server running on ` + process.env.PORT);
    });
  } catch (error) {
    console.log(error);
  }
});
