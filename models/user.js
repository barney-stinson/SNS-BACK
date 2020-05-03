var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        default: ''
    },
    facebookId: String,
    admin:   {
        type: Boolean,
        default: false
    },
    teacher:  {
        type: Boolean,
        default: false
    },
    aaa:  {
        type: Boolean,
        default: false
    },
    dateofbirth: {
        type: Date,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    }
},{
    timestamps: true
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);