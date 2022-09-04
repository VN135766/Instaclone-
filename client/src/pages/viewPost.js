import React, { useState } from "react";
import Post from './Post';
import Comment from './Comment'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const UserComment = (props) => {
    const [comments, setComments] = useState([
      {
        id: 1,
        username: "placeholder",
        comment: "Placeholder comment",
      }
    ])

    const [posts, setPosts] = useState([
      {
        id: 1,
        username: 'placeholder',
        caption: 'placeholder caption',
        imageUrl: "https://cdn-media-1.freecodecamp.org/images/1*qUlxDdY3T-rDtJ4LhLGkEg.png"
      }
    ])
    
    return (
      <div>
  
        { props.authUser && props.authUser.email !== undefined && (
          <p>We have a logged in user: { props.authUser.email } </p>
        )}
  
        <section>

          {
          posts.map(post => (
            <Post key={post.id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
          ))
          }

          {
            comments.map(comment => (
              <Comment key={comment.id} username={comment.username} caption={comment.comment}/>
            ))
          }

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

        </section>
      </div>
    )
  }
  
  export default UserComment