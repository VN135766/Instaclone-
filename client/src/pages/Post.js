import React from 'react'
import '../post.css'

function Post({ username, caption, imageUrl }) {
    return (
        <div className='post_container'>
        <div className='post'>
            <h3 className='post_username'>{username}</h3>

            <img className='post_img' src={imageUrl}></img>

            <h4 className='post_caption'><strong>{username}: </strong>{caption}</h4>
        </div>
        </div>
    )
}

export default Post