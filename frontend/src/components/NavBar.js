import axios from 'axios'
import { Notification } from 'iconsax-react'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../providers/AppProvider'
import { BASE_URL } from '../utils/constants'

const NavBar = () => {

    const navigate = useNavigate()
    const { showSignInModal, setShowSignInModal, userData, setUserData } = useContext(AppContext)

    const signInHandler = async () => {
        if (userData) {
            await axios.get(BASE_URL + 'user/logout')
            setUserData(null)
        } else {
            setShowSignInModal(true)

        }
    }

    return (
        <div className='flex p-3 items-center  bg-bg ' >
            <h1
                onClick={() => navigate('/')}
                className='text-white font-bold cursor-pointer'
            >
                Video App
            </h1>
            <view className='flex-1' />
            <Notification
                variant='Bold'
                color='white'
                size={20}
                className='mr-5 cursor-pointer'
                onClick={() => navigate('/notifications')}
            />
            <p
                onClick={signInHandler}
                className='text-white cursor-pointer'
            >
                {userData ? 'Logout' : 'Sign In'}
            </p>
        </div>
    )
}

export default NavBar