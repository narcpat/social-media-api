const router = require("express").Router();
const {
  addReaction,
  removeReaction,
  getReactionById,
  getAllReactions,
} = require("../../controllers/reaction-controller");

router.route("/").get(getAllReactions);

router.route("/add").post(addReaction);
// /api/reaction/<thoughtID>
router.route("/:reactionId").get(getReactionById).delete(removeReaction);

module.exports = router;
