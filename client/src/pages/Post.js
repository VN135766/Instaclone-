import React from 'react'
import '../post.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'



function Post({ username, caption, imageUrl, userID, author, comment }) {
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

                <h4 className='post_comment'><strong>{author}: </strong>{comment}</h4>

                <div>
                 <Form>
                 <Form.Group className="mb-3" controlId="formBasicComment">
                  <Form.Label>Comment</Form.Label>
                 <Form.Control type="text" placeholder="Enter Comment" />
                 </Form.Group>

                 <Button variant="primary" type="submit">
                     Post
                 </Button>
                 </Form>
                 </div>
            </div>
        </div>
    )
}

export default Post