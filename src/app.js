const path = require("path");
const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
const dotenv = require("dotenv");
dotenv.config({});
const cors = require("cors");
const http = require("http");

const allowedOrigins = ["http://localhost:5173", "https://devtinder.rocks"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
const smartMatchRouter = require("./routes/smartMatch");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/api", chatRouter);
app.use("/api", smartMatchRouter);

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
