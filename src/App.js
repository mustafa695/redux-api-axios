import './App.css';
import Register from './Component/Register';
import Dashboard from './Component/Dashboard';
import Edit from './Component/Edit';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Component/Login';

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/edit/:id">
            <Edit/>
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
