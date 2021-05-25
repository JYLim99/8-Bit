import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import Breakout from "./pages/Breakout"
import "./App.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

function App() {
  return (
    <Router>
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
    </Router>
  )
}

export default App
