const { Thought, User } = require('../models/index');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => {
                return res.json(thoughts);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId})
            .select('-__v')
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thougth with that ID'})
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => 
                 User.findOneAndUpdate(
                     { _id: req.body.userId },
                     { $push: { thoughts: thought._id } },
                     { runValidators: true, new: true }
                 )
                     .then((user) => 
                         !user
                             ? res
                                 .status(404)
                                 .json({ message: 'Thought created but no user found'})
                             : res.json(thought)    
                    )
                    .catch((err) => res.status(500).json(err)));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID'})
                    : User.findOneAndUpdate(
                        { username: thought.username },
                        { $pull: { thoughts: thought._id} },
                        { runValidators: true, new: true }
                    )
                        .then(() => res.json('Thought succesfully deleted!'))
            )
            .catch((err) => res.status(500).json(err));
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: {reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) => 
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'No thought found with that ID :('})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.body.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) => 
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'No thought with that ID :('})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    }
}