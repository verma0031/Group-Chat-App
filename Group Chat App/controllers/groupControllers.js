const User = require("../models/userModel");
const Group = require("../models/groupModel");
const GroupMembers = require('../models/groupMemberModel');

exports.createNewGroup = async (req, res, next) => {
  try {
    const { groupname, user_id } = req.body;
    const group = await Group.create({ group_name: groupname });
    const user = await User.findByPk(user_id);
    const madeAdmin = await user.setGroups(group, {
      through: {
        is_admin: true,
      },
    });
    res.json(group);
  } catch (err) {
    console.log("Error while creating group: ", err);
  }
};

exports.addNewMember = async (req, res, next) => {
  try {
    const {user_id} = req.user;
    const { group_id, email, admin_status } = req.body;

    const group = await GroupMembers.findOne({where: {group_id, user_id}})

    const {is_admin} = group;

    // console.log("\nadding user group\n",is_admin);

    // console.log(group);

    if(is_admin){
      const user = await User.findOne({ where: { email } });
    console.log("\naddmember user\n",user);
    if (user) {
      // const user_id = user.user_id;
      const group = await Group.findByPk(group_id);
      const reply = await group.addUser(user, {
        through: {
          is_admin: admin_status,
        },
      });
      res.status(201).json(reply);
    }
    } 
    else {
      res.json({ message: "Only admin can add members" });
    }
  } catch (err) {
    console.log("Error while updating admin status: ", err);
  }
};

exports.getAllGroups = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    // const group = await Group.findByPk(group_id);
    const user = await User.findByPk(user_id);
    // const reply = group.addUser(
    //   user,
    //   {
    //     through: {
    //       is_admin: admin_status,
    //     },
    //   }
    // );
    const groups = await user.getGroups();
    res.status(200).json({success: true, message:"got all groups of current user", group:groups});
  } catch (err) {
    console.log("Error while fetching groups: ", err);
  }
};

