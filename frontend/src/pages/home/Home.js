import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import VideoItem from '../../components/VideoItem'
import { BASE_URL } from '../../utils/constants'

const videos = [{ name: 'vid1', upload_date: new Date(), thumbnail: 'https://cdn.pixabay.com/photo/2023/03/02/22/11/belgium-7826588_960_720.jpg', likes: 0, views: 0 }, { name: 'vid1', upload_date: new Date(), thumbnail: 'https://cdn.pixabay.com/photo/2023/03/02/22/11/belgium-7826588_960_720.jpg', likes: 0, views: 0 }, { name: 'vid1', upload_date: new Date(), thumbnail: 'https://cdn.pixabay.com/photo/2023/03/02/22/11/belgium-7826588_960_720.jpg', likes: 0, views: 0 }, { name: 'vid1', upload_date: new Date(), thumbnail: 'https://cdn.pixabay.com/photo/2023/03/02/22/11/belgium-7826588_960_720.jpg', likes: 0, views: 0 }, { name: 'vid1', upload_date: new Date(), thumbnail: 'https://cdn.pixabay.com/photo/2023/03/02/22/11/belgium-7826588_960_720.jpg', likes: 0, views: 0 }, { name: 'vid1', upload_date: new Date(), thumbnail: 'https://cdn.pixabay.com/photo/2023/03/02/22/11/belgium-7826588_960_720.jpg', likes: 0, views: 0 },]

const Home = () => {

    const [videos, setVideos] = useState([])

    const getAllVideos = async () => {
        const response = await axios.get(BASE_URL + 'video/get_all')
        if (response.status == 200) {
            console.log(response.data)
            setVideos(response.data)
        }
    }

    useEffect(() => {
        getAllVideos()
    }, [])

    return (
        <div className='flex flex-wrap' >


            {
                videos.map(vid => <VideoItem video={vid} />)
            }

        </div>
    )
}

export default Home