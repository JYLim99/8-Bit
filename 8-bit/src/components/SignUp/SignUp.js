import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './SignUp.module.css'

// MUI Stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

//Redux stuff
import { connect } from 'react-redux'
import { signupUser } from '../../redux/actions/userActions'

const styles = (theme) => ({
  page: {
    backgroundColor: '#efefe3',
    height: '87vh',
  },
  form: {
    margin: '0px auto auto auto',
    textAlign: 'center',
    fontFamily: 'Organic Teabags',
    fontSize: '1.5rem',
  },
  pageTitle: {
    margin: '0px auto 0px auto',
    fontFamily: 'Caramel Sweets',
    fontSize: '40px',
    letterSpacing: 0.8,
    fontWeight: 500,
    marginBottom: '10%',
    marginTop: '10%'
  },
  textField: {
    margin: '5px auto 5px auto',
  },
  input: {
    fontFamily: 'Caramel Sweets',
    fontSize: '20px',
    letterSpacing: '.5px',
    marginBottom: '5%'
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
    marginBottom: '10%',
    '&:hover': {
      background: 'none',
    },
  },
  customError: {
    fontFamily: 'Organic Teabags',
    color: 'red',
    fontSize: '15px',
  },
  progress: {
    position: 'absolute',
  },
  tip: {
    fontSize: '1.8rem',
    letterSpacing: '0.8px',
    margin: '10px auto auto auto'
  },
})

class signup extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
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
    this.setState({
      loading: true,
    })
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    }
    this.props.signupUser(newUserData, this.props.history)
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
              SignUp
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
              <TextField
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                placeholder='Confirm Password'
                className={classes.textField}
                helperText={errors.confirmPassword}
                error={errors.confirmPassword ? true : false}
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  className: classes.input,
                }}
              />
              <TextField
                id='handle'
                name='handle'
                type='text'
                placeholder='Handle'
                className={classes.textField}
                helperText={errors.handle}
                error={errors.handle ? true : false}
                value={this.state.handle}
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
                SignUp
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
              <br />
              <small className={classes.tip}>
                <Link to='/login'>Login</Link>
              </small>
            </form>
          </Grid>
          <Grid item sm />
        </Grid>
      </div>
    )
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
})

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(signup)
)
