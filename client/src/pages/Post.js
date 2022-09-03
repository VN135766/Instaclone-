import React from 'react'
import '../post.css'

function Post({ username, caption, imageUrl }) {
    return (
        <div className='post'>
            <h3 className='post_username'>{username}</h3>

            <img className='post_img' src={imageUrl}></img>

            <h4 className='post_comment'><strong>{username}: </strong>{caption}</h4>
        </div>
    )
}

// function Post() {
//     return (
//       <Card style={{ width: '25rem' }}>

//         <Card.Body>
//         <Card.Title>Username</Card.Title>
//         <Card.Img variant="top" src="https://cdn-media-1.freecodecamp.org/images/1*qUlxDdY3T-rDtJ4LhLGkEg.png" />
//           <Card.Text>
//             Post description
//           </Card.Text>
//           <Card.Text muted>
//               Comments
//           </Card.Text>
//           <Card.text>
//               Username
//           </Card.text>
//         </Card.Body>
//       </Card>
//     );
//   }

export default Post