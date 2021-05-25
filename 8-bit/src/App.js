<<<<<<< HEAD
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import Breakout from "./pages/Breakout"
import "./App.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
=======
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './components/Context/AuthContext';
>>>>>>> Login

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <div className="App">
        <div className="Header"></div>
<<<<<<< HEAD
          <Header />
          <div className="Content">
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/LoginPage">
                <LoginPage />
              </Route>
            </Switch>
          </div>
=======
        <Header />
        <div className="Content">
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/LoginPage">
              <LoginPage />
            </Route>
            <Route path="/Breakout">
              <Breakout />
            </Route>
          </Switch>
        </div>
>>>>>>> Breakout
      </div>
=======
      <AuthProvider>
          <div className="App">
            <div className="Header"></div>
              <Header />
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
                </Switch>
              </div>
          </div>
      </AuthProvider>
>>>>>>> Login
    </Router>
  )
}

export default App
