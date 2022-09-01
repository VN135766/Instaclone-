import { useState } from "react";

import Carousel from "react-bootstrap/Carousel"
import Badge from "react-bootstrap/Badge"

const UserWithImgs = (props) => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };


    console.log(props)

    const {
        name,
        images
    } = props;

    console.log(name)
    console.log(images)

    return (
        <div>
            <h3>{name}</h3>

            <Carousel activeIndex={index} onSelect={handleSelect}>
                {images.map((image) => {
                    return (
                        <Carousel.Item key={image.title}>
                            <img
                                className="d-block w-100"
                                src={image.src}
                                alt={image.title}
                            />
                            <Carousel.Caption>
                                <h4>{image.title}</h4>
                                <p>{image.caption}</p>
                                <div
                                    className={{
                                        display: 'flex'
                                    }}
                                >
                                    {image.tags.map((tag) => {
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