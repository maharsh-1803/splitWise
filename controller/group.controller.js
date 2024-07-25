const Group = require("../model/group.model");
const User = require("../model/user.model");

const createGroup = async (req, res) => {
    try {
        const { name, members, groupType } = req.body;

        // Convert comma-separated string to array of usernames
        const membersArray = members.split(',');

        // Find users by usernames
        const validMembers = await User.find({ username: { $in: membersArray } }).select('_id username');

        // Check if all provided members are valid
        if (validMembers.length !== membersArray.length) {
            return res.status(400).json({ message: 'Some members do not exist' });
        }

        // Map valid members to their IDs
        const memberIds = validMembers.map(member => member._id);

        // Create and save new group
        const newGroup = new Group({
            name,
            members: memberIds,
            groupType
        });

        const group = await newGroup.save();

        return res.status(200).json({
            message: "Group created successfully",
            group
        });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};



const getGroup = async(req,res)=>{
    try {
        const groups = await Group.find();

        if(!groups){
            return res.status(400).send({message:"no any group available"})
        }
        return res.status(200).json({
            message:"Group retrive successfully",
            groups:groups
        })
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const getGroupById = async(req,res)=>{
    try {
        const {id} = req.params;
        const group = await Group.findById(id);
        if(!group){
            return res.status(400).send({message:"group is not available with this id"});
        }
        return res.status(200).json({
            message:"Group retrive successfully",
            group:group
        })
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const getMyGroup = async (req, res) => {
    try {
      const tokenData = req.user;
      const userId = tokenData._id;
  
      const groups = await Group.find({ members: userId }).populate('members', 'username');
  
      res.status(200).json({
        success: true,
        message: 'Groups retrieved successfully',
        groups,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve groups',
        error: error.message,
      });
    }
  };
  

module.exports={
    createGroup,
    getGroup,
    getGroupById,
    getMyGroup
}