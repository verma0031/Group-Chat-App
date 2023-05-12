(async () => {
  // await sequelize.sync({ force: true }); // This will drop and recreate all tables
  // await sequelize.sync(); // This will drop and recreate all tables
  // Create some example users
  // const user1 = await User.create({
  //   username: "john",
  //   email: "john@example.com",
  //   password: "password123",
  // });
  // const user2 = await User.create({
  //   username: "jane",
  //   email: "jane@example.com",
  //   password: "password123",
  // });
  // Create a group and add users to it
  // const group1 = await Group.create({
  //   group_name: "Group 1",
  //   admin_id: user1.user_id,
  // });
  // await group1.addUser(user1, { through: { is_admin: true } });
  // await group1.addUser(user2);
  // const group1 = await Group.create({
  //   group_name: "Group 1",
  // });
  // await user1.addGroup(group1, { through: { is_admin: true } });
  // await group1.addUser(user2);
  // // Create a chat in the group
  // await Chat.create({
  //   group_id: group1.group_id,
  //   sender_id: user1.user_id,
  //   message: "Hello, world!",
  // });
  // const res = await Chat.findAll({
  //   include: [
  //     {
  //       model: User,
  //       attributes: ["username"],
  //       where: { user_id: 1 },
  //     },
  //     {
  //       model: Group,
  //       attributes: ["group_name"],
  //       where: { group_id: 1 },
  //     },
  //   ],
  // });
  // console.log("\n\n\n", res[0].dataValues);
  // const userInGroup = await Group.findOne({
  //   where: {
  //     group_id: 1,
  //   },
  //   include: [
  //     {
  //       model: User,
  //       attributes: ["user_id"],
  //       where: {
  //         user_id: 2,
  //       },
  //     },
  //   ],
  // });
  // const addedAdmin = await GroupMembers.update(
  //   { is_admin: false },
  //   {
  //     where: {
  //       user_id: userInGroup.users[0].user_id,
  //       group_id: 1,
  //     },
  //   }
  // );
  // console.log(`\n\n\n\n\n\n`);
  // console.log(userInGroup.users[0].user_id);
})();
