const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


const noticeSchema = new Schema({
    message: {
        type: String,
        default: ''
    },
    title:{
        type: String,
        required: true
    },
    author:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    file: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

var Notices = mongoose.model('Notice', noticeSchema);

module.exports = Notices;