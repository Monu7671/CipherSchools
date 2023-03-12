import moment from 'moment'
import React from 'react'

const NotificationItem = ({ notification }) => {
    return (
        <div className='m-2 w-1/4 border p-3 rounded' >
            <h1 className='text-lg font-semibold' >{notification.title}</h1>
            <p className='text-xs text-slate-400' >{moment(new Date(notification.timestamp)).format('DD MMMM YYYY')}</p>
            <p className='mt-5 text-sm text-slate-700' >{notification.description}</p>
        </div>
    )
}

export default NotificationItem