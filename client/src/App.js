import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './Home';
import NavBar from './components/NavBar';
import { Counter } from "./examples/Counter/Counter";
import { PostsList } from "./examples/Post/PostsList";
import { AddPostForm } from "./examples/Post/AddPostForm";
import { SinglePostPage } from './examples/Post/SinglePostPage';
import { EditPostForm } from './examples/Post/EditPostForm';

function App() {
  return (
    <div className="App">
      <h1>Redux Examples</h1>
      <Router>
        <NavBar />
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
                <AddPostForm />
                <PostsList />
              </React.Fragment>
            )}
          />
          <Route exact path="/posts/:postId" component={SinglePostPage} />
          <Route exact path="/editPost/:postId" component={EditPostForm} />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
