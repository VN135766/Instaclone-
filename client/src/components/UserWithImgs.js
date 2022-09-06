import { useState } from "react";
import { useParams } from 'react-router-dom';

import Carousel from "react-bootstrap/Carousel"
import Badge from "react-bootstrap/Badge"
import Button from 'react-bootstrap/Button';

const UserWithImgs = (props) => {
    const [index, setIndex] = useState(0);
    const { id } = useParams()

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const handleFollow = async () => {
        const response = await fetch(`/api//user/follow/${id}`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}
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
                <Button
                    style={{
                        margin: '1rem'
                    }}
                    onClick={handleFollow}
                >
                    Follow
                </Button>
            </div>

            <Carousel activeIndex={index} onSelect={handleSelect}>
                {posts.map(post => {
                    return (
                        <Carousel.Item key={post._id}>
                            <img
                                className="d-block w-100"
                                src={post.image}
                                alt={post.imageName}
                            />
                            <Carousel.Caption>
                                <h4>{post.imageName}</h4>
                                <p>{post.captionName}</p>
                                <div
                                    className={{
                                        display: 'flex'
                                    }}
                                >
                                    {post.tags.map((tag) => {
                                        return (
                                            <Badge
                                                pill
                                                bg="light"
                                                text="dark"
                                                style={{
                                                    marginLeft: '.25rem',
                                                    marginRight: '.25rem'
                                                }}
                                            >
                                                {tag}
                                            </Badge>
                                        )
                                    })}
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        </div>
    )
};

export default UserWithImgs;