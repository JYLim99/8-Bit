import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import SpaceInvaderIcon from '../../images/SpaceInvaderIcon.png'

// MUI Stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

// Redux stuff
import { connect } from 'react-redux'
import { loginUser } from '../../redux/actions/userActions'

const styles = (theme) => ({
  page: {
    backgroundColor: '#efefe3',
    display: 'flex',
    flexFlow: 'column',
    height: '84.5vh',
    width: '100vw',
  },
  form: {
    textAlign: 'center',
    fontFamily: 'Organic Teabags',
    fontSize: '1.8rem',
    margin: '45px auto auto auto',
  },
  image: {
    margin: '0px auto auto auto',
    display: 'block',
    top: 50,
    height: 100,
    width: 100,
  },
  pageTitle: {
    margin: '0px auto 0px auto',
    fontFamily: 'Caramel Sweets',
    letterSpacing: 0.8,
    fontWeight: 500,
  },
  textField: {
    margin: '10px auto 10px auto',

    height: 10,
  },
  input: {
    fontFamily: 'Organic Teabags',
    fontSize: '1.5rem',
  },
  button: {
    margin: '10px auto 15px auto',
    position: 'relative',
    fontFamily: 'Organic Teabags',
    fontSize: '1.1rem',
    borderRadius: 15,
    backgroundColor: 'transparent',
    color: '#d4a373',
    padding: 10,
    fontWeight: 700,
    width: 100,
    cursor: 'pointer',
    letterSpacing: 1.5,
    border: '3px solid #d4a373',
    '&:hover': {
      background: 'none',
    },
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
  },
  progress: {
    position: 'absolute',
  },
  tip: {
    fontFamily: 'Organic Teabags',
    fontSize: '1.2rem',
    letterSpacing: '0.5px',
    margin: '10px auto auto auto',
  },
})

class login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {},
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors })
    }
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.loginUser(userData, this.props.history)
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props
    const { errors } = this.state

    return (
      <div className={classes.page}>
        <Grid container className={classes.form}>
          <Grid item sm />
          <Grid item sm>
            <img
              src={SpaceInvaderIcon}
              alt='Space Invaders Logo'
              className={classes.image}
            />
            <Typography variant='h2' className={classes.pageTitle}>
              Login
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                id='email'
                name='email'
                type='email'
                label='Email'
                className={classes.textField}
                helperText={errors.email}
                error={errors.email ? true : false}
                value={this.state.email}
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  className: classes.input,
                }}
              />
              <TextField
                id='password'
                name='password'
                type='password'
                label='Password'
                className={classes.textField}
                helperText={errors.password}
                error={errors.password ? true : false}
                value={this.state.password}
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  className: classes.input,
                }}
              />
              {errors.general && (
                <Typography variant='body2' className={classes.customError}>
                  {errors.general}
                </Typography>
              )}
              <Button
                type='submit'
                variant='contained'
                color='#ee4540'
                className={classes.button}
                disabled={loading}
              >
                Login
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
              <br />
              <small>
                Don't have an account? Sign up <Link to='/signup'>here</Link>
                <div className={classes.tip}>
                  Having an account allows you to qualify
                  <br />
                  for the leaderboard and use the forum
                </div>
              </small>
            </form>
          </Grid>
          <Grid item sm />
        </Grid>
      </div>
    )
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
})

const mapActionsToProps = {
  loginUser,
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login))
