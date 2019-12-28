let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate-v2');

const Feed = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    source: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    }
});

Feed.plugin(mongoosePaginate);
module.exports = mongoose.model('Feed', Feed);
