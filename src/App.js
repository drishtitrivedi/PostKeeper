import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Posts from "./components/posts";
import PostForm from "./components/postForm";
import Header from "./components/header";

function App() {
  return (
    <React.Fragment>
      <main className="container">
        <Header />
        <Switch>
          <Route path="/posts" component={Posts} />
          <Route path="/newpost" component={PostForm} />
          <Redirect exact from="/" to="/posts" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
