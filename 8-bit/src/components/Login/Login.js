import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

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
    height: '87vh',
    width: '100vw',
  },
  form: {
    textAlign: 'center',
    fontFamily: 'Organic Teabags',
    fontSize: '1.8rem',
    margin: '45px auto auto auto',
  },
  pageTitle: {
    margin: '0px auto 0px auto',
    fontFamily: 'Caramel Sweets',
    fontSize: '50px',
    letterSpacing: 0.8,
    fontWeight: 500,
    marginBottom: '10%',
    marginTop: '5%',
  },
  textField: {
    margin: '10px auto 10px auto',
  },
  input: {
    fontFamily: 'Caramel Sweets',
    fontSize: '20px',
    letterSpacing: '.5px',
    marginBottom: '5%',
  },
  button: {
    margin: '10px auto 15px auto',
    position: 'relative',
    fontFamily: 'Organic Teabags',
    fontSize: '1.1rem',
    borderRadius: 15,
    backgroundColor: 'transparent',
    color: '#d4a373',
    padding: '10',
    fontWeight: 700,
    width: 100,
    cursor: 'pointer',
    letterSpacing: 1.5,
    border: '3px solid #d4a373',
    marginTop: '5%',
    marginBottom: '5%',
    '&:hover': {
      background: 'none',
    },
  },
  customError: {
    fontFamily: 'Organic Teabags',
    color: 'red',
    fontSize: '20px',
  },
  progress: {
    position: 'absolute',
  },
  tip: {
    fontFamily: 'Organic Teabags',
    fontSize: '1.2rem',
    letterSpacing: '0.5px',
    margin: '10px auto auto auto',
    marginTop: '3%',
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
            <Typography variant='h2' className={classes.pageTitle}>
              Login
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                id='email'
                name='email'
                type='email'
                placeholder='Email'
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
                placeholder='Password'
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
                Dont have an account? Sign up <Link to='/signup'>here</Link>
                <div className={classes.tip}>
                  Having an account qualifies you for the leaderboard, forum and
                  superchat
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
