const
    express = require('express'),
    router = express.Router(),
    feedService = require('./../services/feedService'),
    scrapService = require('./../services/scrapService');

router.route('/feed/:id')
    .get(async (req, res) => {
        const id = req.params.id;
        try {
            const feed = await feedService.getFeed(id);
            res.json(feed);
        } catch (err) {
            res.status(400).send({
                status: 400,
                err
            });
        }
    })
    .put(async (req, res) => {
        const id = req.params.id;
        const updates = req.body;
        try {
            const result = await feedService.editFeed(id, updates);
            res.send({
                status: 200,
                data: result,
                message: 'Success'
            });
        } catch (err) {
            res.status(400).send({
                status: 400,
                err
            });
        }
    })
    .delete(async (req, res) => {
        try {
            const feedDeleted = await feedService.deleteFeed(req.params.id);
            res.send({
                status: 200,
                data: feedDeleted,
                message: 'Success'
            });
        } catch (err) {
            res.status(400).send({
                status: 400,
                err
            });
        }
    });

router.route('/feed')
    .get(async (req, res) => {
        const page = req.query.page || 0;
        const limit = req.query.limit || 5;
        try {
            const feeds = await feedService.getFeeds(page, limit);
            res.json({
                status: 200,
                data: feeds,
                message: 'Success'
            });
        } catch (err) {
            res.status(400).send({
                status: 400,
                err
            });
        }
    })
    .post(async (req, res) => {
        try {
            const result = await feedService.addFeed(req.body);
            res.send({ result });
        } catch (err) {
            res.status(400).send({
                status: 400,
                err
            });
        }
    });

router.route('/feed/scrap')
    .post(async (req, res) => {
        try {
            const data = await scrapService.parseFeed(req.body.url);
            res.status(200).send({
                status: 200,
                data
            });
        } catch (err) {
            res.status(400).send({
                status: 400,
                err
            });
        }
    });

// TODO: REMOVE
router.route('/clean')
    .delete(async (req, res) => {
        try {
            const data = await feedService.clean();
            res.status(200).send({
                status: 200,
                data
            });
        } catch (err) {
            res.status(400).send({
                status: 400,
                err
            });
        }
    });

module.exports = router;