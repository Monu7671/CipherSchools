import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import SignInModal from '../components/SignInModal'
import { AppContext } from '../providers/AppProvider'
import { BASE_URL } from '../utils/constants'

const MainLayout = () => {

    const { showSignInModal, setUserData, setShowSignInModal, userData } = useContext(AppContext)
    const [loading, setLoading] = useState(false)

    const initialiser = async () => {
        setLoading(true)
        await axios.get(BASE_URL + 'user/details', { withCredentials: true })
            .then(res => {
                if (res.status == 200) {

                    console.log(res.data, 'user')
                    // setUserData(res.data)



                    setLoading(false)
                }
            }).catch((error) => {
                console.log(error)
                setLoading(false)
            })


    }

    useEffect(() => {
        if (!userData?._id) {
            initialiser()
        }
    }, [userData?._id])

    return (
        <div>
            <NavBar />

            <Outlet />
            {showSignInModal && < SignInModal />}
        </div>
    )
}

export default MainLayout