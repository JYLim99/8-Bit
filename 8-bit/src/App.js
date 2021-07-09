import Header from './components/Header'
import { Fragment } from 'react'
import Menu from './components/Menu'
import HomePage from './pages/HomePage/HomePage'
import SignUp from './components/SignUp/SignUp'
import Login from './components/Login/Login'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Breakout from './pages/Breakout'
import Pong from './components/Pong/Pong'
import SpaceInvaders from './components/GameSpaceInvaders/Game/Game'
import user from './pages/Dashboard'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import Chat from './components/Chat/Chat'
import UpdateProfile from './components/UpdateProfile/UpdateProfile'
import Game from './pages/GamePage/Game'
import Forum from './pages/Forum'
import Leaderboard from './components/Leaderboard/Leaderboards'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

//Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userActions'

//Components
import AuthRoute from './util/AuthRoute'

/* For firebase deployment:
axios.defaults.baseURL =
  'https://asia-southeast1-orbital-8-bit.cloudfunctions.net/api'*/

const token = localStorage.FBIdToken

if (token) {
  const decodedToken = jwtDecode(token)
  console.log(decodedToken)
  //Check if token has expired
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <div className='Content'>
            <Switch>
              <Route exact path='/Menu' component={Menu} />
              <Route exact path='/Chat' component={Chat} />
              {/* <Route exact path="/">
                  <Game />
              </Route> */}
              <Fragment>
                <div className='Header'>
                  <Header />
                </div>
                <Route exact path='/' component={Game} />
                <AuthRoute exact path='/SignUp' component={SignUp} />
                <AuthRoute path='/Login' component={Login} />
                <Route exact path='/users/:handle' component={user} />
                <Route
                  exact
                  path='/users/:handle/post/:postId'
                  component={user}
                />
                <Route path='/Leaderboard' component={Leaderboard} />
                <Route path='/SpaceInvaders' component={SpaceInvaders} />
                <Route path='/Breakout' component={Breakout} />
                <Route path='/Pong' component={Pong} />
                <Route path='/Forum' component={Forum} />
                <Route path='/ForgetPassword' component={ForgetPassword} />
                <Route path='/UpdateProfile' component={UpdateProfile} />
              </Fragment>
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  )
}

export default App
