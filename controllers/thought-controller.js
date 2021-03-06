const { Thought } = require("../models");

const thoughtController = {
  // get all users
  getAllThoughts(req, res) {
    Thought.find({})
      .select("-__v")
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get thought by id
  getThoughtById({ params }, res) {
    console.log("get Thought function");
    Thought.findOne({ _id: params.thoughtId })
      // .populate({
      //   path: "reactions",
      //   select: "-__v",
      // })
      .select("-__v")
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // create a new thought
  addThought({ body }, res) {
    Thought.create(body)
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  },

  // update a user by id
  updateThought({ params, body }, res) {
    console.log("update Thought function");
    console.log(params.thoughtId);
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
      new: true,
      runValidators: true,
    })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "User not found" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // delete a user
  removeThought({ params }, res) {
    Thought.findByIdAndDelete({ _id: params.thoughtId })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  },
};

module.exports = thoughtController;
