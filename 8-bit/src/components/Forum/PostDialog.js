import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../../util/MyButton'
//import LikeButton from './LikeButton'
import Comments from './Comments'
import CommentForm from './CommentForm'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

//Icon
import ChatIcon from '@material-ui/icons/Chat'
import CloseIcon from '@material-ui/icons/Close'
//import UnfoldMore from '@material-ui/icons/UnfoldMore'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import IconButton from '@material-ui/core/IconButton'

//Redux stuff
import { connect } from 'react-redux'
import { getPost, clearErrors } from '../../redux/actions/dataActions'

const styles = {
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    margin: '0 10px 10px 10px',
  },
  invisibleSeparator: {
    border: 'none',
    margin: 4,
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '2%',
  },
  /*
  expandButton: {
    position: 'absolute',
    left: '90%',
  },*/
  profileImage: {
    maxWidth: 200,
    height: 200,
    objectFit: 'cover',
    borderRadius: '50%',
  },
  handle: {
    fontFamily: 'Organic Teabags',
    fontSize: '1.6rem',
    letterSpacing: '0.02rem',
  },
  dialogContent: {
    padding: 20,
    fontFamily: 'Organic Teabags',
    fontSize: '1.2rem',
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  body: {
    fontFamily: 'Organic Teabags',
    fontSize: '1.3rem',
  },
}

class PostDialog extends Component {
  state = {
    open: false,
    oldPath: '',
    newPath: '',
  }

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen()
    }
  }

  handleOpen = () => {
    let oldPath = window.location.pathname

    const { userHandle, postId } = this.props
    const newPath = `/users/${userHandle}/post/${postId}`

    if (oldPath === newPath) oldPath = `/users/${userHandle}`

    window.history.pushState(null, null, newPath)

    this.setState({ open: true, oldPath, newPath })
    this.props.getPost(this.props.postId)
  }

  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath)
    this.setState({ open: false })
    this.props.clearErrors()
  }

  likedPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.postId === this.props.postId)
    )
      return true
    else return false
  }

  render() {
    const {
      classes,
      post: {
        postId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments,
      },
      UI: { loading },
    } = this.props

    const likeButton = this.likedPost() ? (
      <FavoriteIcon color='primary' />
    ) : (
      <FavoriteBorder color='primary' />
    )

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={3}>
        <Grid item sm={5}>
          <img src={userImage} alt='Profile' className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color='primary'
            variant='h5'
            to={`/users/${userHandle}`}
            className={classes.handle}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant='body2' color='textSecondary'>
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant='body1' className={classes.body}>
            {body}
          </Typography>
          <IconButton disabled={true}>{likeButton}</IconButton>
          <span>{likeCount} Likes</span>
          <IconButton disabled={true}>
            <ChatIcon color='primary' />
          </IconButton>
          <span>{commentCount} comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm postId={postId} />
        <Comments comments={comments} />
      </Grid>
    )

    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip='Expand post'
          tipClassName={classes.expandButton}
        >
          <ChatIcon color='primary' />
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
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

//To use LikeButton component:
//<LikeButton postId={postId} />

PostDialog.propTypes = {
  user: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
  post: state.data.post,
  UI: state.UI,
})

const mapActionsToProps = {
  getPost,
  clearErrors,
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PostDialog))
