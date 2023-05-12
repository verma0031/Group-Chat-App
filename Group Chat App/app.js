const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes");
const groupRoutes = require("./routes/groupRoutes");
const chatRoutes = require("./routes/chatRoutes");

const sequelize = require("./utils/database");
const User = require("./models/userModel");
const Chat = require("./models/chatModel");
const Group = require("./models/groupModel");
const GroupMembers = require("./models/groupMemberModel");

User.belongsToMany(Group, {
  through: GroupMembers,
  foreignKey: "user_id",
  onDelete: "cascade",
});

Group.belongsToMany(User, {
  through: GroupMembers,
  foreignKey: "group_id",
  onDelete: "cascade",
});

Chat.belongsTo(Group, {
  foreignKey: "group_id",
});

Chat.belongsTo(User, {
  foreignKey: "sender_id",
});

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/group", groupRoutes);
app.use("/chat", chatRoutes);

(async function () {
  await sequelize.sync();
  app.listen(8080);
})();
