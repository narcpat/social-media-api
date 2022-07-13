const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  removeThought,
} = require("../../controllers/thought-controller");

// /api/users
router.route("/").get(getAllThoughts).post(addThought);

// /api/thought/<thoughtId>
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought);

module.exports = router;
