import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import firebase from "firebase";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import App from "./components/App";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Spinner from "./components/Spinner";
import rootReducer from "./reducers";
import { setUser } from "./actions";

import * as serviceWorker from "./serviceWorker";

import "semantic-ui-css/semantic.min.css";

const store = createStore(rootReducer, composeWithDevTools());

// function Root(props) {
//   useEffect(() => {
//     firebase.auth().onAuthStateChanged(user => {
//       if (user) {
//         console.log(user);
//         props.setUser(user);
//         props.history.push("/");
//       }
//     });
//   });

//   return (
//     <Switch>
//       <Route exact path="/" component={App} />
//       <Route path="/login" component={Login} />
//       <Route path="/register" component={Register} />
//     </Switch>
//   );
// }

class Root extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        this.props.setUser(user);
        this.props.history.push("/");
      }
    });
  }

  render() {
    return this.props.isLoading ? (
      <Spinner />
    ) : (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.user.isLoading
});

const RootWithAuth = withRouter(
  connect(
    mapStateToProps,
    { setUser }
  )(Root)
);

//const RootWithAuth = withRouter(Root);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
