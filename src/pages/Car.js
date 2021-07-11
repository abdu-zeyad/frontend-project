import React, { Component } from "react";
import "./Car.css";
import { Card, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export class Car extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="containercar">
        <div className="caritem">
          {this.props.itemData.map((item) => {
            return (
              <Card style={{ width: "50rem" }}>
                <Card.Img variant="top" src={item.age} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text></Card.Text>
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
              </Card>
            );
          })}
        </div>
        <div className="rightside">
          <div className="reviews">
            <Form onSubmit={this.renderReview}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Add a Review</Form.Label>
                <Form.Control type="text" placeholder="your name" name="name" />
                <Form.Text className="text-muted">
                  What do you think about this car
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Write a Review</Form.Label>
                <Form.Control
                  type="text"
                  className="revieboxcar"
                  name="review"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
          <div className="renderReviews">renderreview</div>
        </div>
      </div>
    );
  }
}

export default Car;
