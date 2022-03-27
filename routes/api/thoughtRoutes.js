const router = require('express').Router();
const {
    getThoughts,
    createThought,
    getSingleThought,
    updateThought
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought);

module.exports = router;