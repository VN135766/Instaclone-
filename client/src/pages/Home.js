import React, {useState} from 'react'
import Post from './Post'

const Home = (props) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "placeholder",
      caption: "Placeholder Caption",
      imageUrl: "https://cdn-media-1.freecodecamp.org/images/1*qUlxDdY3T-rDtJ4LhLGkEg.png",
    },
    {
      id: 2,
      username: "placeholder 2",
      caption: "Placeholder Caption",
      imageUrl: "https://cdn-media-1.freecodecamp.org/images/1*qUlxDdY3T-rDtJ4LhLGkEg.png",
    },
  ])
  
  return (
    <div>
      <h1 className="text-center">Welcome to Instaclone!</h1>

      { props.authUser && props.authUser.email !== undefined && (
        <p>We have a logged in user: { props.authUser.email } </p>
      )}

      <section>

        {
          posts.map(post => (
            <Post key={post.id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
          ))
        }
 
      </section>
    </div>
  )
}

export default Home