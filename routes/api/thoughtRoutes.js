const router = require('express').Router();
const {
    getThoughts,
    createThought,
    getSingleThought
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought);

module.exports = router;