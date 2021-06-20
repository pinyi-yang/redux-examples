import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import { Counter } from "./examples/Counter/Counter";
import { Counter2 } from "./examples/Counter2/Counter2"

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <h1>Home Page</h1>
            <NavBar/>
          </Route>
          <Route exact path="/counter">
            <Counter /><hr/>
            <h2>With Payload prepare</h2>
            <Counter2 />
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
