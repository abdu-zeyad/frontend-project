import React, { Component } from "react";
import { Form, Button, Card, Row, Col, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import axios from "axios";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { allData: [], show: false, index: -1 };
  }
  componentDidMount = async () => {
    const server = process.env.REACT_APP_SERVER;
    // const server = "https://propject.herokuapp.com";

    const data = await axios.get(`${server}/all`);
    this.setState({
      allData: data.data,
    });
  };
  postData = async (e) => {
    e.preventDefault();
    const obj = {
      name: e.target.name.value,
      age: e.target.age.value,
    };
    const server = process.env.REACT_APP_SERVER;
    // const server = "https://propject.herokuapp.com";

    const data = await axios.post(`${server}/post`, obj);
    this.setState({
      allData: data.data,
    });
    console.log(data.data);
  };
  delete = async (id) => {
    console.log(id);

    const server = process.env.REACT_APP_SERVER;
    // const server = "https://propject.herokuapp.com";

    const data = await axios.delete(`${server}/delete?id=${id}`);
    this.setState({
      allData: data.data,
    });
  };
  showupdateform = (idx) => {
    this.setState({
      show: true,
      index: idx,
    });
  };
  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    return (
      <div className="containerHome">
        <div className="renderitems">
          <Row xs={1} md={3} className="g-4">
            {this.state.allData.map((items, idx) => {
              return (
                <Col>
                  <Card style={{ width: "18rem" }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                      <Card.Title>{items.name}</Card.Title>
                      <Card.Text>{items.age}</Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => this.delete(items._id)}
                      >
                        delete
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => this.showupdateform(idx)}
                      >
                        update
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
        <div className="form">
          <Form onSubmit={this.postData}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>name</Form.Label>
              <Form.Control type="text" name="name" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>age</Form.Label>
              <Form.Control type="text" name="age" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div className="modelhome">
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.updatedata}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>name</Form.Label>
                  <Form.Control type="text" name="name" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>age</Form.Label>
                  <Form.Control type="text" name="age" />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Home;
