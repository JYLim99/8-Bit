import Header from './components/Header';
import HomePage from './pages/HomePage/HomePage';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Menu from './components/Menu/Menu';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './components/Context/AuthContext';
import Breakout from "./pages/Breakout";
import Pong from './components/Pong/Pong';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <AuthProvider>
          <div className="App">
            <div className="Header">
                <Header />
              </div>
              <div className="Content">
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
                    <Route path="/ProfilePage">
                      <ProfilePage />
                    </Route>
                    <Route path="/Breakout">
                      <Breakout />
                    </Route>
                    <Route path="/Pong">
                      <Pong />
                    </Route>
                  </Switch>
              </div>
          </div>
      </AuthProvider>
    </Router>
  )
}

export default App