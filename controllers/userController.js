const User = require('../models/User');
const Thought = require('../models/Thought')

module.exports = {
  async getUsers(req, res) { 
    try {
      const users = await User.find()
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
   
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found!' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ username: req.body.username });

      // if (!thought) {
      //   return res.status(404).json({ message: 'No thought with this id!' });
      // }

      const user = await User.findOneAndRemove(
        { _id: req.params.userId },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Video created but no user with this id!' });
      }

      res.json({ message: 'User successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    try {
      
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendID } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'friend added, but found no user with that ID',
        });
      }

      res.json('Congrats on a new buddy 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }, 
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Friend created but no user with this id!' });
      }

      res.json({ message: 'Friend successfully removed!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
