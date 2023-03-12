import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../providers/AppProvider'
import { BASE_URL } from '../../utils/constants'
import NotificationItem from './components/NotificationItem'

const Notifications = () => {

    const { userData, setShowSignInModal } = useContext(AppContext)


    const [notifications, setNotifications] = useState([])

    const getNotifications = async () => {

        const response = await axios.get(BASE_URL + 'notification/get/' + userData._id)
        if (response.status == 200) {
            console.log(response.data, 're')
            setNotifications(response.data)
        }

    }

    useEffect(() => {
        if (userData?._id) {
            getNotifications()
        } else {
            setShowSignInModal(true)
        }
    }, [userData?._id])

    return (
        <div className='p-5 ' >
            <h1 className=' text-2xl font-bold' >Notifications</h1>
            <div className='mt-5 flex flex-wrap' >
                {
                    notifications.map((not) => <NotificationItem notification={not} />)
                }
            </div>
        </div>
    )
}

export default Notifications