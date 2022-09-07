import React, { useState, useEffect } from 'react'
import Post from './Post'
import Cookie from 'js-cookie'

import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

const Home = (props) => {
  const [posts, setPosts] = useState(null)

  const fetchPosts = async () => {
    const lookupQuery = await fetch(`/api/post/`);
    const parsedResponse = await lookupQuery.json();

    if (parsedResponse.result === 'success') {
      setPosts(parsedResponse.payload)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, []);

  if (!posts) {
    return (
      <Container style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '1.5rem'
      }}>
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <div>
      <h1 className="text-center">Welcome to Instaclone!</h1>

      <section>

        {
          posts.map(post => (
            <Post
              key={post._id}
              username={post.createdBy.user_name}
              caption={post.imageCaption}
              imageUrl={post.image}
              userID={post.createdBy._id}
            />
          ))
        }

      </section>
    </div>
  )
}

export default Home