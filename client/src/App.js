import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import AssignRoles from './AssignRoles';

import Home from './Home';
import { Helmet } from "react-helmet";


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/roles" component={AssignRoles} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
