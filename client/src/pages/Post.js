import React from 'react'
import '../post.css'

function Post({ username, caption, imageUrl, userID }) {
    return (
        <div className='post_container'>
            <div className='post'>
                <h3 className='post_username'>
                    <a href={`/user/${userID}`}>
                        {username}
                    </a>
                </h3>

                <img className='post_img' src={imageUrl}></img>

                <h4 className='post_caption'><strong>{username}: </strong>{caption}</h4>
            </div>
        </div>
    )
}

export default Post