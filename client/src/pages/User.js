import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Spinner from 'react-bootstrap/Spinner';

import noAvatar from '../assets/images/noAvatar.svg'
import UserWithImgs from '../components/UserWithImgs';

const User = (props) => {
  // id is the name of the wildcard variable we specified in the route in App.js
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  //const following;

  const fetchUser = async () => {
    const lookupQuery = await fetch(`/api/user/${id}`);
    const parsedResponse = await lookupQuery.json();

    if (parsedResponse.result === 'success') {
      setUser(parsedResponse.payload);
    }

    //following = user.following;

    setLoading(false);
  };

  useEffect( () => {
    fetchUser();
  }, []);

  if (loading) {
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

  const following = [
    {
      name: 'Foo',
      images: [
        {
          title: 'Bar',
          caption: 'Caption',
          tags: [
            'lit',
            'awesome',
            'dope'
          ],
          src: noAvatar
        },
        {
          title: 'Bar',
          caption: 'Caption',
          tags: [
            'lit',
            'awesome',
            'dope'
          ],
          src: noAvatar
        },
        {
          title: 'Bar',
          caption: 'Caption',
          tags: [
            'lit',
            'awesome',
            'dope'
          ],
          src: noAvatar
        }
      ]
    },
    {
      name: 'Foo',
      images: [
        {
          title: 'Bar',
          caption: 'Caption',
          tags: [
            'lit',
            'awesome',
            'dope'
          ],
          src: noAvatar
        },
        {
          title: 'Bar',
          caption: 'Caption',
          tags: [
            'lit',
            'awesome',
            'dope'
          ],
          src: noAvatar
        },
        {
          title: 'Bar',
          caption: 'Caption',
          tags: [
            'lit',
            'awesome',
            'dope'
          ],
          src: noAvatar
        }
      ]
    },
    {
      name: 'Foo',
      images: [
        {
          title: 'Bar',
          caption: 'Caption',
          tags: [
            'lit',
            'awesome',
            'dope'
          ],
          src: noAvatar
        },
        {
          title: 'Bar',
          caption: 'Caption',
          tags: [
            'lit',
            'awesome',
            'dope'
          ],
          src: noAvatar
        },
        {
          title: 'Bar',
          caption: 'Caption',
          tags: [
            'lit',
            'awesome',
            'dope'
          ],
          src: noAvatar
        }
      ]
    }
  ];

  return (
    <Container style={{ paddingTop: '1em' }}>
      <Stack gap={1}> 
        {following.map((user) => {
          return (
            <UserWithImgs name={user.name} images={user.images}/>
          )
        })}
      </Stack>
    </Container>
  )
}

export default User