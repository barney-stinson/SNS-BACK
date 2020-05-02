const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment:  {
        type: String,
        required: true
    },
    author:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    notice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notice'
    }
}, {
    timestamps: true
});

var Comments = mongoose.model('Comment', commentSchema);

module.exports = Comments;