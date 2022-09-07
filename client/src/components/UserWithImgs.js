import { useState } from "react";
import { useParams } from 'react-router-dom';

import Stack from "react-bootstrap/Stack"
import Image from 'react-bootstrap/Image'

import '../post.css'

const UserWithImgs = (props) => {
    const [index, setIndex] = useState(0);
    const { id } = useParams()

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const handleFollow = async () => {
        const response = await fetch(`/api//user/follow/${id}`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const parsedResponse = await response.json();

        console.log(parsedResponse)
    }

    const {
        posts,
        name
    } = props;

    return (
        <div>
            <div style={{
                display: 'flex',
                margin: '1rem'
            }}>
                <h3
                    style={{
                        margin: '1rem'
                    }}
                >
                    {name}
                </h3>
                {/*<Button
                    style={{
                        margin: '1rem'
                    }}
                    onClick={handleFollow}
                >
                    Follow
                </Button>*/}
            </div>

            <Stack >
                {posts.map(post => {
                    return (
                        <Image
                            className="post_img"
                            thumbnail
                            src={`/${post.image}`}
                        />
                    )
                })}
            </Stack>
        </div>
    )
};

export default UserWithImgs;