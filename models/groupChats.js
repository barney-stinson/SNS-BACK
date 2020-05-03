const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupChatSchema = new Schema({
    message:  {
        type: String,
        required: true
    },
    user:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }
}, {
    timestamps: true
});

var GroupChats = mongoose.model('GroupChat', groupChatSchema);

module.exports = GroupChats;