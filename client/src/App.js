import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './Home';
import NavBar from './components/NavBar';
import { Counter } from "./examples/Counter/Counter";
import { PostsList } from "./examples/Post/PostsList";
import { AddPostForm } from "./examples/Post/AddPostForm";

function App() {
  return (
    <div className="App">
      <h1>Redux Examples</h1>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/counter">
            <Counter />
          </Route>
          <Route exact path="/posts" 
            render = { () => (
              <React.Fragment>
                <NavBar />
                <AddPostForm />
                <PostsList />
              </React.Fragment>
            )}
          />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
