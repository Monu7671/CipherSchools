const Notification = require('../modals/NotificationModal');


const addNotification = async (userId, title, description) => {
    try {
        await Notification.create({ user_id: userId, title, description })
    } catch (error) {

    }
}


module.exports = {
    addNotification
}