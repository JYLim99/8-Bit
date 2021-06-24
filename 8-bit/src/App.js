import Header from "./components/Header";
import { Fragment } from "react";
import Menu from "./components/Menu";
import HomePage from "./pages/HomePage/HomePage";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./components/Context/AuthContext";
import './App.css';
import Breakout from "./pages/Breakout";
import Pong from "./components/Pong/Pong";
import SpaceInvaders from "./components/GameSpaceInvaders/Game/Game";
import Dashboard from "./pages/Dashboard";
import ForgetPassword  from "./components/ForgetPassword/ForgetPassword";
import Chat from "./components/Chat/Chat";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <div className="Content">
            <Switch>
              <Route exact path="/Menu">
                  <Menu />
              </Route>
              <Route exact path="/Chat">
                  <Chat />
              </Route>
              <Fragment>
                <div className="Header">
                <Header />
                </div>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route exact path="/SignUp">
                  <SignUp />
                </Route>
                <Route path="/Login">
                  <Login />
                </Route>
                <Route path="/Dashboard">
                  <Dashboard />
                </Route>
                <Route path="/SpaceInvaders">
                  <SpaceInvaders />
                </Route>
                <Route path="/Breakout">
                  <Breakout />
                </Route>
                <Route path="/Pong">
                  <Pong />
                </Route>
                <Route path="/ForgetPassword">
                  <ForgetPassword />
                </Route>
                <Route path="/UpdateProfile">
                  <UpdateProfile />
                </Route>
              </Fragment>
            </Switch>
          </div>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
