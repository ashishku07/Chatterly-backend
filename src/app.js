const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");

const connectDB = require("./config/database");
const initializeSocket = require("./utils/socket");

// Load environment variables
dotenv.config();

const app = express();

// Allow requests from frontend (both local and production)
const allowedOrigins = [
  "http://localhost:5173", // Dev (local)
  "https://devtinder.rocks", // Prod
  "http://3.133.145.153", // Your EC2 IP
];

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

// ========== ROUTES ==========
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");
const smartMatchRouter = require("./routes/smartMatch");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/api", chatRouter);
app.use("/api", smartMatchRouter);

// ========== START SERVER ==========
const server = http.createServer(app);
initializeSocket(server);

connectDB().then(() => {
  server.listen(process.env.PORT || 3000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
  });
});
