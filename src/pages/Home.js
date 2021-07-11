import React, { Component } from "react";
import { Form, Button, Card, Row, Col, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import axios from "axios";
import { Link } from "react-router-dom";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { allData: [], show: false, id: 0 };
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
  };
  delete = async (id) => {
    const server = process.env.REACT_APP_SERVER;
    // const server = "https://propject.herokuapp.com";

    const data = await axios.delete(`${server}/delete?id=${id}`);
    this.setState({
      allData: data.data,
    });
  };
  showupdateform = (_id) => {
    this.setState({
      show: true,
      id: _id,
    });
  };
  handleClose = () => {
    this.setState({
      show: false,
    });
  };
  updatedata = async (e) => {
    e.preventDefault();

    const obj = {
      name: e.target.name.value,
      age: e.target.age.value,
      id: this.state.id,
    };
    console.log(obj);
    const server = process.env.REACT_APP_SERVER;
    // const server = "https://propject.herokuapp.com";

    const data = await axios.put(`${server}/update`, obj);
    this.setState({
      allData: data.data,
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
                  <Card style={{ width: "10 %", maxHeight: "300px" }}>
                    <Link
                      to="car"
                      onClick={() => this.props.carinfo(items._id)}
                    >
                      <Card.Img
                        variant="top"
                        src={items.age}
                        style={{ height: "150px" }}
                      />
                    </Link>

                    <Card.Body>
                      <Card.Title style={{ height: "50px" }}>
                        {items.name}
                      </Card.Title>
                      <Card.Text></Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => this.delete(items._id)}
                      >
                        delete
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => this.showupdateform(items._id)}
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
              <Form.Label>Image Link</Form.Label>
              <Form.Control type="text" name="age" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div className="modelhome">
          <Modal show={this.state.show}>
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
