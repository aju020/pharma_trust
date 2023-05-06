import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import AssignRoles from './AssignRoles';
import AddMed from './AddMed';
import Update from './Update'
import Track from './Track'

import Home from './Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/roles" component={AssignRoles} />
          <Route path="/addmed" component={AddMed} />
          <Route path="/update" component={Update} />
          <Route path="/track" component={Track} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
