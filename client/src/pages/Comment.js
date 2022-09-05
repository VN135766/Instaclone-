import React from 'react'
import '../comments.css'

function Comment({ username, caption }) {
    return (
        <div className='comment_container'>
        <div className='comments'>
            <h4 className='comment_caption'><strong>{username}: </strong>{caption}</h4>
        </div>
        </div>
    )
}

export default Comment