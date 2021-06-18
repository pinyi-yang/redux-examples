import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import { Counter } from "./examples/Counter/Counter"

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
            <Counter />
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
