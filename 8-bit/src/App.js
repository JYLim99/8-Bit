import Header from './components/Header';
import HomePage from './pages/HomePage';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './components/Context/AuthContext';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
