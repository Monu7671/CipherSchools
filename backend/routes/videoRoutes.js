let express = require('express');
const { addNotification } = require('../related/addNotification');
const Video = require('../modals/VideoModal');

let router = express.Router();

router.post('/create', async (req, res) => {

    let newVid = {
        name: 'Chat GPT',
        thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/800px-ChatGPT_logo.svg.png',
        video_url: 'https://www.youtube.com/watch?v=PPmGYE38o50&t=346s'
    };


    try {
        let user = await Video.create(newVid)
        // console.log(user)
        // console.log(token)
        res.status(200)
            .send(user)
    } catch (error) {
        console.log(error)
    }

})

router.get('/get_all', async (req, res) => {


    try {
        let videos = await Video.find()
        // console.log(user)
        // console.log(token)
        res.status(200)
            .send(videos)
    } catch (error) {
        console.log(error)
    }

})

router.get('/:_id', async (req, res) => {
    const { _id } = req.params ?? {}

    if (!_id) return res.sendStatus(401)

    try {
        let video = await Video.findById(_id)
        // console.log(user)
        // console.log(token)
        if (!video) return res.sendStatus(401)

        res.status(200)
            .send(video)
    } catch (error) {
        console.log(error)
    }

})

router.post('/like', async (req, res) => {
    const { _id, userId, userName } = req.body ?? {}

    if (!_id) return res.sendStatus(401)



    try {
        let video = await Video.findByIdAndUpdate(_id, { $inc: { likes: 1 } }, { new: true })
        // console.log(user)
        // console.log(token)
        if (!video) return res.sendStatus(401)
        const title = 'Video liked'
        const description = `One more like for ${video?.name} by ${userName}`
        await addNotification(userId, title, description)

        res.status(200)
            .send(video)
    } catch (error) {
        console.log(error)
    }

})

router.post('/views', async (req, res) => {
    const { _id } = req.body ?? {}

    if (!_id) return res.sendStatus(401)

    try {
        let video = await Video.findByIdAndUpdate(_id, { $inc: { views: 1 } }, { new: true })
        // console.log(user)
        // console.log(token)
        // if (!video) return res.sendStatus(401)

        res.status(200)
            .send(video)
    } catch (error) {
        console.log(error)
    }

})


router.post('/comment', async (req, res) => {
    const { _id, comment, userName, userId } = req.body ?? {}
    if (!_id) return res.sendStatus(401)

    const newComment = {
        user_name: userName,
        comment
    }

    try {
        let video = await Video.findByIdAndUpdate(_id, { $push: { comments: newComment } }, { new: true })

        // adding notification on new comments
        const title = 'New comment added'
        const description = `${userName} commented to ${video.name} video`
        await addNotification(userId, title, description)

        res.status(200)
            .send(video.comments)
    } catch (error) {
        console.log(error)
    }

})

router.get('/comments/:id', async (req, res) => {
    const { id, comment } = req.params ?? {}
    if (!id) return res.sendStatus(401)

    try {
        let video = await Video.findById(id)

        res.status(200)
            .send(video.comments)
    } catch (error) {
        console.log(error)
    }

})


module.exports = router