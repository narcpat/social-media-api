const { response } = require("express");
const { Reaction, Thought, User } = require("../models");

const reactionController = {
  // get reactions
  getAllReactions({ req, res }) {
    Reaction.find({})
      .select("-__v")
      .sort({ _id: -1 })
      .then(dbReactionData => res.json(dbReactionData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getReactionById({ params }) {
    console.log(params);
  },

  // add a reaction
  addReaction({ params, body }, res) {
    console.log(params);
    Reaction.create(body)
      .then(({ _id }) => {
        return Reaction.findOneAndUpdate(
          { _id: params.reactionId },
          { $push: { reaction: _id } },
          { new: true }
        );
      })
      .then(dbReactionData => {
        console.log(dbReactionData);
        if (!dbReactionData) {
          res.status(404).json({ message: "No reaction found with this id" });
        }
        res.json(dbReactionData);
      })
      .catch(err => res.json(err));
  },

  // remove a reaction
  removeReaction({ params }, res) {
    Thought.findByIdAndUpdate(
      { _id: params.reactionId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbReactionData => res.json(dbReactionData))
      .catch(err => res.json(err));
  },
};

module.exports = reactionController;
