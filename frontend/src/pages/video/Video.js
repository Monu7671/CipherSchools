import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../../utils/constants'
import CommentInput from './components/CommentInput'
import CommentItem from './components/CommentItem'
import InteractionBar from './components/InteractionBar'
const Video = () => {

    const [video, setVideo] = useState(null)
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    const { videoId } = useParams()


    const getVideoDetails = async () => {
        setLoading(true)
        try {
            let response = await axios.get(BASE_URL + 'video/' + videoId,)
            if (response.status == 200) {
                console.log(response.data)
                setVideo(response.data)
                setLoading(false)
            }
        } catch (error) {
            alert("Couldn't get video, Try again")
            setLoading(false)
        }
    }


    const updateView = async () => {
        try {
            let response = await axios.post(BASE_URL + 'video/views', { _id: videoId })
            if (response.status == 200) {
                setVideo(response.data)
            }
        } catch (error) {
            alert("Couldn't like video, Try again")
        }
    }
    const getComments = async () => {
        try {
            let response = await axios.get(BASE_URL + 'video/comments/' + videoId,)
            if (response.status == 200) {
                console.log(response.data, 'comments')
                setComments(response.data)
                setLoading(false)
            }
        } catch (error) {
            alert("Couldn't get video, Try again")
            setLoading(false)
        }
    }

    useEffect(() => {
        getVideoDetails()
        getComments()
    }, [])

    if (loading) return <h1>Loading...</h1>

    return (
        <div className='p-10 ' >
            <div className='flex'>
                <ReactPlayer
                    controls={true}
                    url={video?.video_url}
                    onStart={updateView}
                // style={{ width: '100%' }}
                />

                <div className='px-3 w-1/2' >
                    <h1 className='text-xl font-semibold' >{video?.name}</h1>

                    {/* Like, share and views bar */}
                    <InteractionBar video={video} setVideo={setVideo} />

                </div>
            </div>

            {/* Comments */}
            <section class="bg-white dark:bg-gray-900 py-8 lg:py-16 ">
                <div class=" mx-auto px-4">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Comments ({comments.length})</h2>
                    </div>
                    <CommentInput setComments={setComments} videoId={videoId} />
                    {
                        comments.map(comment => <CommentItem commentItem={comment} />)
                    }
                </div>
            </section>

        </div>
    )
}

export default Video