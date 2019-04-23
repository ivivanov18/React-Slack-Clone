import React, { useState } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";

import firebase from "../../firebase";

function Register() {
  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  });

  function handleChange(event) {
    //event.persist();
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(inputValues.email, inputValues.password)
      .then(user => console.log(user));
  }

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange" />
          Register for DevChat
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              type="text"
              value={inputValues.username}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              type="email"
              value={inputValues.email}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={inputValues.password}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="lock"
              iconPosition="left"
              placeholder="Password Confirmation"
              type="password"
              value={inputValues.passwordConfirmation}
              onChange={handleChange}
            />

            <Button color="orange" fluid size="large">
              Submit
            </Button>
          </Segment>
        </Form>
        <Message>
          Already a user?<Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default Register;
