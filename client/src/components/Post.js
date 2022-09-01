import React from "react";
import { Card, Row, Image, Form } from 'react-bootstrap';
import { BsThreeDots } from "react-icons/bs";
// import { BsHeart, BsChatRight, BsTelegram, BsBookmark } from 'react-icons/bs';
import "../App.css";


export const Post = () => {
  return (
    <Card>
      <Card.Header className ="header">
        <div>
          <Image
            className="w-32"
            src="https://picsum.photos/id/101/32/32"
            roundedCircle={true}
            thumbnail={true}
          />
          <Card.Link className ="username"
          >
            placeholder
          </Card.Link>
        </div>
        <Card.Link className="threeDots">
        <BsThreeDots />
        </Card.Link>
      </Card.Header>
      <Image
                className="w-614"
                src="https://picsum.photos/id/101/614/614"
            />
<Card.Body>
                <div className="reactionsBar">
                    {/* <div>
                        <BsHeart />
                        <BsChatRight />
                        <BsTelegram />
                    </div> */}
                </div>
                <div className="commentsAndLikesBar">
                    <Card.Text className="likes">20 likes</Card.Text>
                    <Card.Text className="title">
                        <b>Username</b> Photo Title
                    </Card.Text>
                    <Card.Text>
                        <small>19 hours ago</small>
                    </Card.Text>
                </div>
            </Card.Body>
            <Card.Footer className="footer">
        <Form.Control
            type="text"
            placeholder="Add a comment..."
            className="addCommentFormInput"
        />
    </Card.Footer>
    </Card>
  );
};
