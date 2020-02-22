import React from 'react';
import './App.css';
import SignUp from './components/user_signup';
import SignIn from './components/user_signin';
import Todo from './container/user_Todo';
import Profile from './components/userProfile';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route path="/" exact component={SignIn}/>
            <Route path="/register" component={SignUp}/>
            <Route path="/todos" component={Todo}/>
            <Route path="/profile" component={Profile}/>
          </Switch>
        </header>
      </div>
    </Router>
  );
}   

export default App;
