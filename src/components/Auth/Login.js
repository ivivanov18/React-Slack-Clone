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
import firebase from "firebase";

function Login() {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: ""
  });
  // TODO: improve this declaration --> medium article on errors to avoid when writing hooks
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function isFormValid({ email, password }) {
    return email.length !== 0 && password.length !== 0;
  }

  function handleInputError(inputName) {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  }

  function displayErrors() {
    return errors.map((error, i) => <p key={i}>{error.message}</p>);
  }

  function handleChange(event) {
    //event.persist();
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (isFormValid(inputValues)) {
      setIsLoading(true);
      setErrors([]);
      firebase
        .auth()
        .signInWithEmailAndPassword(inputValues.email, inputValues.password)
        .then(signedInUser => {
          setIsLoading(false);
          console.log(signedInUser);
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
          setErrors([err]);
        });
    }
  }

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="violet" textAlign="center">
          <Icon name="code branch" color="violet" />
          Login for DevChat
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              type="email"
              value={inputValues.email}
              onChange={handleChange}
              className={handleInputError("email")}
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
              className={handleInputError("password")}
            />
            <Button
              disabled={isLoading}
              className={isLoading ? "loading" : ""}
              color="violet"
              fluid
              size="large"
            >
              Submit
            </Button>
          </Segment>
        </Form>
        {errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {displayErrors()}
          </Message>
        )}
        <Message>
          Don't have an account? <Link to="/register"> Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default Login;
