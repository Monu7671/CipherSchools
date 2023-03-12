import React, { useContext, useState } from 'react'
import { BASE_URL } from '../../../utils/constants'
import axios from 'axios'
import { AppContext } from '../../../providers/AppProvider'


const CommentInput = ({ videoId, setComments }) => {

    const { userData, setShowSignInModal } = useContext(AppContext)

    const [commentTxt, setCommentTxt] = useState('')

    const postComment = async (e) => {
        e.preventDefault()

        if (!userData?._id) return setShowSignInModal(true)

        try {
            const res = await axios.post(BASE_URL + 'video/comment', {
                _id: videoId, comment: commentTxt, userId: userData?._id, userName: userData?.name
            })
            if (res.status == 200) {
                setComments(res.data)
                setCommentTxt('')
            }
        } catch (error) {
            alert('Comment not submitted')
        }
    }

    return (
        <form onSubmit={postComment} class="mb-6">
            <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label for="comment" class="sr-only">Your comment</label>
                <textarea id="comment" rows="6"
                    class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..."
                    required
                    onChange={(e) => setCommentTxt(e.target.value)}
                    value={commentTxt}
                >

                </textarea>
            </div>
            <button type="submit"
                class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-blue-800">
                Post
            </button>
        </form>
    )
}

export default CommentInput