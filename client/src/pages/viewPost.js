import React, { useState } from "react";
import Post from './Post';
import Comment from './Comment'


const UserComment = (props) => {
    const [comments, setComments] = useState([
      {
        id: 1,
        username: "placeholder",
        caption: "Placeholder comment",
      },
      {
        id: 2,
        username: "placeholder 2",
        caption: "Placeholder comment",
      }
    ])
    
    return (
      <div>
  
        { props.authUser && props.authUser.email !== undefined && (
          <p>We have a logged in user: { props.authUser.email } </p>
        )}
  
        <section>
  
          {
            comments.map(comment => (
              <Comment key={comment.id} username={comment.username} caption={comment.caption}/>
            ))
          }
   
        </section>
      </div>
    )
  }
  
  export default UserComment