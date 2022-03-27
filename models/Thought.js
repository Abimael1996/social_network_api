const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createAt: {
            type: Date,
            default: Date.now,
            get: format
        },
        username: {
            type: String, 
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }

);

function format(date) {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`
};

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
