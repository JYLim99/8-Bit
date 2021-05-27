import Header from './components/Header';
import HomePage from './pages/HomePage/HomePage';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './components/Context/AuthContext';
import Breakout from "./pages/Breakout";
import Pong from './components/Pong/Pong';

function App() {
  return (
    <Router>
      <AuthProvider>
          <div className="App">
            <div className="Header"></div>
              <Header />
              <div className="Content">
                <body>
                  <Switch>
                    <Route exact path="/">
                      <HomePage />
                    </Route>
                    <Route exact path="/SignUp">
                      <SignUp />
                    </Route>
                    <Route path="/Login">
                      <Login />
                    </Route> 
                    <Route path="/Breakout">
                      <Breakout />
                    </Route>
                    <Route path="/Pong">
                      <Pong />
                    </Route>
                  </Switch>
                </body>
              </div>
          </div>
      </AuthProvider>
    </Router>
  )
}

export default App