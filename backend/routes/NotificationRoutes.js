let express = require('express');
const Notification = require('../modals/NotificationModal');
let router = express.Router();


router.post('/create', async (req, res) => {
    const { title, description, userId } = req.body



    const newNotification = {
        title,
        description,
        user_id: userId
    };


    try {
        let notification = await Notification.create(newNotification)

        res.status(200)
            .send(notification)
    } catch (error) {
        console.log(error)
    }

})

router.get('/get/:userId', async (req, res) => {
    const { userId } = req.params ?? {}
    if (!userId) return res.sendStatus(401)

    const notifications = await Notification.find({ user_id: userId })

    res.status(200).send(notifications)

})

module.exports = router