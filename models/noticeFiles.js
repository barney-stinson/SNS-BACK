const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noticeFilesSchema = new Schema({
    filePath: {
        type: String,
        default: ''
    },
    fileType: {
        type: String,
        default: ''
    },
    notice:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notice'
    }
}, {
    timestamps: true
});

var NoticeFiles = mongoose.model('NoticeFile', noticeFilesSchema);

module.exports = NoticeFiles;