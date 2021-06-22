import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './Home';
import { Counter } from "./examples/Counter/Counter";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
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
