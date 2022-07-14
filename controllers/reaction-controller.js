const { Reaction, Thought, User } = require("../models");

const reactionController = {
  // add a reaction
  addReaction({ params, body }, res) {
    console.log(params);
    Reaction.create(body)
      .then(({ _id }) => {
        return Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbThoughtData => {
        console.log(dbThoughtData);
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id" });
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // remove a reaction
  removeReaction({ params }, res) {
    Thought.findByIdAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  },
};

module.exports = reactionController;
