import axios from 'axios'
import React, { useContext } from 'react'
import { BASE_URL } from '../../../utils/constants'
import { Eye, Like1, Send2, } from 'iconsax-react'
import { AppContext } from '../../../providers/AppProvider'

const InteractionBar = ({ setVideo, video, }) => {
    const { userData, setShowSignInModal } = useContext(AppContext)
    const shareHandler = () => {
        let url = window.location.href
        navigator.clipboard.writeText(`${url}`)
        alert('copied to clipboard')
    }

    const updateLike = async () => {

        if (!userData?._id) return setShowSignInModal(true)

        try {
            let response = await axios.post(BASE_URL + 'video/like', { _id: video._id, userId: userData?._id, userName: userData?.name })
            if (response.status == 200) {
                // console.log(response.data)
                alert('Liked')
                setVideo(response.data)
            }
        } catch (error) {
            alert("Couldn't like video, Try again")
        }
    }
    return (
        <div className='mt-5 w-full flex justify-between' >
            <div className='w-1/3 flex flex-col items-center' >
                <Like1
                    onClick={updateLike}
                    className=' cursor-pointer'
                    size={32}
                    color="black"
                />
                <p className='text-slate-600' >{video?.likes} likes</p>
            </div>
            <div className='w-1/3 flex flex-col items-center' >
                <Eye
                    className=''
                    size={32}
                    color="black"
                />
                <p className='text-slate-600'>{video?.views} views</p>
            </div>
            <div className='w-1/3 flex flex-col items-center' >
                <Send2
                    onClick={shareHandler}
                    className=' cursor-pointer'
                    size={32}
                    color="black"
                />
                <p className='text-slate-600'>Share</p>
            </div>
        </div>
    )
}

export default InteractionBar