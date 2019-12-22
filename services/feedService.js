const Feed = require('./../models/feedModel');

const getFeeds = async (page, limit) => {
    return await Feed.paginate({}, {
        limit,
        offset: page
    });
}

const getFeed = async (id) => {
    return await Feed.findById({ _id: id });
}

const addFeed = async (feed) => {
    return await new Feed(feed).save();
}

const deleteFeed = async (id) => {
    const feedDeleted = await Feed.findByIdAndRemove({ _id: id });
    if(!feedDeleted) {
        throw new Error("Feed not found")
    }
    return feedDeleted;
}

const editFeed = async (id, updates) => {
    return await Feed.findByIdAndUpdate(id, updates, { new: true });
}

module.exports = {
    getFeeds,
    getFeed,
    addFeed,
    deleteFeed,
    editFeed
}