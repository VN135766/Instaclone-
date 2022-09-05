import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Spinner from 'react-bootstrap/Spinner';

import UserWithImgs from '../components/UserWithImgs';

const User = (props) => {
  // id is the name of the wildcard variable we specified in the route in App.js
  const { id } = useParams()
  const [posts, setPosts] = useState(null)
  const [name, setName] = useState(null)

  const fetchPosts = async () => {
    const lookupQuery = await fetch(`/api/post/user/${id}`);
    const parsedResponse = await lookupQuery.json();

    if (parsedResponse.posts) {
      setPosts(parsedResponse.posts); 
    }
  };

  const fetchName = async () => {
    const lookupQuery = await fetch(`/api/user/${id}`);
    const parsedResponse = await lookupQuery.json();

    setName(parsedResponse.payload.user_name)
  }

  useEffect(() => {
    fetchPosts();
    fetchName();
  }, []);

  if (!posts || !name) {
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
    <Container style={{ paddingTop: '1em' }}>
      <Stack gap={1}>
        <UserWithImgs posts={posts} name={name}/>
      </Stack>
    </Container>
  )
}

export default User