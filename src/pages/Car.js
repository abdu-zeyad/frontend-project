import React, { Component } from "react";
import "./Car.css";
import { Card, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export class Car extends Component {
  constructor(props) {
    super(props);
    this.state = { item: this.props.itemData, allrevies: [] };
  }
  renderReview = async (e) => {
    e.preventDefault();
    const obj = {
      namereview: e.target.namereview.value,
      review: e.target.review.value,
      id: this.props.itemData[0]._id,
    };
    console.log(obj);
    const server = process.env.REACT_APP_SERVER;
    // const server = "https://propject.herokuapp.com";

    const data = await axios.post(`${server}/postreview`, obj);
    this.setState({
      allrevies: data.data,
    });
    console.log(data.data);
  };

  deleterr = async (id) => {
    const server = process.env.REACT_APP_SERVER;
    // const server = "https://propject.herokuapp.com";
    const data = await axios.delete(`${server}/deletereview?id=${id}`);
    this.setState({
      allrevies: data.data,
    });
  };
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
                <Form.Control type="text" name="namereview" />
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
          <div className="renderReviews">
            {this.state.allrevies.map((item) => {
              return (
                <Card style={{ width: "18rem" }} className="cardrevies">
                  <Card.Body>
                    <Card.Title className="cardTilte">
                      {item.namereview}
                    </Card.Title>
                    <Card.Text>{item.review}</Card.Text>
                    {/* <Button
                      variant="primary"
                      onClick={() => this.deleterr(item._id)}
                    >
                      delete
                    </Button>{" "} */}
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Car;
