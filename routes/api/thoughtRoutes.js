const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReactions,
  removeReactions,
} = require('../../controllers/thoughtController');

// /api/Thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/Thoughts/:ThoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/Thoughts/:ThoughtId/responses
router.route('/:thoughtId/reactions').post(addReactions);

// /api/Thoughts/:ThoughtId/responses/:responseId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReactions);

module.exports = router;
