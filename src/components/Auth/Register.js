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
import md5 from "md5";
import { Link } from "react-router-dom";

import firebase from "../../firebase";

function Register() {
  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  });
  // TODO: improve this declaration --> medium article on errors to avoid when writing hooks
  const [usersRef] = useState(firebase.database().ref("users"));

  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function isFormValid() {
    let currentErrors = [];
    let error;

    if (!isFormEmpty(inputValues)) {
      error = { message: "Fill in all fields" };
      // TODO: recheck behaviour of currentErrors.push in setErrors and try if concat is better
      currentErrors.push(error);
      setErrors(currentErrors);
      return false;
    } else if (!isPasswordValid(inputValues)) {
      error = { message: "Password is invalid" };
      currentErrors.push(error);
      setErrors(currentErrors);
      return false;
    } else {
      return true;
    }
  }

  function isPasswordValid({ password, passwordConfirmation }) {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  }

  function isFormEmpty({ username, email, password, passwordConfirmation }) {
    return (
      !(username.length === 0) ||
      !(email.length === 0) ||
      !(password.length === 0) ||
      !(passwordConfirmation.length === 0)
    );
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
    if (isFormValid()) {
      setIsLoading(true);
      setErrors([]);
      firebase
        .auth()
        .createUserWithEmailAndPassword(inputValues.email, inputValues.password)
        .then(createdUser => {
          console.log(createdUser);
          createdUser.user
            .updateProfile({
              displayName: inputValues.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`
            })
            .then(() => {
              saveUser(createdUser).then(() => {
                console.log("user saved");
                setIsLoading(false);
              });
            })
            .catch(err => {
              setIsLoading(false);
              setErrors([err]);
            });
        })
        .catch(err => {
          setIsLoading(false);
          setErrors([err]);
        });
    }
  }

  function saveUser(createdUser) {
    return usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
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
            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="lock"
              iconPosition="left"
              placeholder="Password Confirmation"
              type="password"
              value={inputValues.passwordConfirmation}
              onChange={handleChange}
              className={handleInputError("password")}
            />

            <Button
              disabled={isLoading}
              className={isLoading ? "loading" : ""}
              color="orange"
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
          Already a user?<Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default Register;
