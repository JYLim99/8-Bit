import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../../util/MyButton'

//MUI stuff
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'

//Icon
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

//Redux stuff
import { connect } from 'react-redux'
import { makePost, clearErrors } from '../../redux/actions/dataActions'

const styles = {
  textField: {
    margin: '10px auto 10px auto',
  },
  input: {
    fontFamily: 'Organic Teabags',
    fontSize: '1.3rem',
    letterSpacing: '0.03rem',
  },
  prompt: {
    fontFamily: 'Organic Teabags',
    fontSize: '1.0rem',
    letterSpacing: '0.03rem',
    margin: 'auto auto auto 0px',
  },
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10,
  },
  progressSpinner: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%',
  },
}

class MakePost extends Component {
  state = {
    open: false,
    body: '',
    errors: {},
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      })
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '', open: false, errors: {} })
    }
  }

  //Functions to handle open and closing of the make post dialog
  handleOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.props.clearErrors()
    this.setState({ open: false, errors: {} })
  }

  //Function to handle changes, specific events
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  //Function to submit the text in the field as the post
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.makePost({ body: this.state.body })
  }
  render() {
    const { errors } = this.state
    const {
      classes,
      UI: { loading },
    } = this.props
    return (
      <Fragment>
        <div className={classes.prompt}>Make a Post!</div>
        <MyButton onClick={this.handleOpen} tip='Make a Post!'>
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <MyButton
            tip='Close'
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Make a new post</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name='body'
                type='text'
                label='Post'
                multiline
                rows='3'
                placeholder='Make a post for other users to see'
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  className: classes.input,
                }}
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

MakePost.propTypes = {
  makePost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  UI: state.UI,
})

export default connect(mapStateToProps, { makePost, clearErrors })(
  withStyles(styles)(MakePost)
)
