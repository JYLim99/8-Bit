import Header from "./components/Header";
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="Header"></div>
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
      </div>
    </Router>
  );
}

export default App;
