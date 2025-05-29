const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");
const ConnectionRequest = require("../models/connectionRequest");

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("$"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173", // update if needed
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      console.log(`${firstName} joined Room: ${roomId}`);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, lastName, userId, targetUserId, text }) => {
        try {
          const roomId = getSecretRoomId(userId, targetUserId);
          console.log(`${firstName}: ${text}`);

          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          const newMessage = {
            senderId: userId,
            text,
            createdAt: new Date(), // manually attach createdAt
          };

          chat.messages.push(newMessage);
          await chat.save();

          // Send message with timestamp
          io.to(roomId).emit("messageReceived", {
            firstName,
            lastName,
            text,
            createdAt: newMessage.createdAt,
          });
        } catch (err) {
          console.error("Socket error:", err);
        }
      }
    );

    socket.on("disconnect", () => {
      // Optional: log disconnection
    });
  });
};

module.exports = initializeSocket;
