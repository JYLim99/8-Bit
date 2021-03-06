import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import DeletePost from '../DeletePost'
import PostDialog from '../PostDialog'
//import MyButton from '../../../util/MyButton'
import LikeButton from '../LikeButton'
import './Post.module.css'

//MUI Stuff
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

/*Icons
import ChatIcon from '@material-ui/icons/Chat'*/

//Redux
import { connect } from 'react-redux'

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    height: 170,
    marginBottom: 20,
    fontFamily: 'Organic Teabags',
    fontSize: '1.2rem',
    overflow: 'auto',
  },
  image: {
    minWidth: 80,
    height: 80,
    margin: '15px 0px 10px 15px',
    borderRadius: '50%',
  },
  content: {
    padding: '15px 25px 25px 20px',
    objectFit: 'cover',
  },
  body: {
    fontFamily: 'Organic Teabags',
    fontSize: '1.3rem',
  },
  handle: {
    fontFamily: 'Organic Teabags',
    fontSize: '1.6rem',
    letterSpacing: '0.02rem',
  },
  /*
  date: {
    fontFamily: 'Organic Teabags',
    fontSize: '1.2rem',
  },*/
}
class Post extends Component {
  render() {
    dayjs.extend(relativeTime)
    const {
      classes,
      post: {
        body,
        createdAt,
        userImage,
        userHandle,
        postId,
        likeCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeletePost postId={postId} />
      ) : null

    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title='Profile image'
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant='h5'
            component={Link}
            to={`/users/${userHandle}`}
            color='primary'
            className={classes.handle}
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography
            variant='body2'
            color='textSecondary'
            className={classes.date}
          >
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant='body1' className={classes.body}>
            {body}
          </Typography>
          <LikeButton postId={postId} />
          <span>{likeCount} Likes</span>
          <PostDialog
            postId={postId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
          <span key={this.props.post.commentCount}>
            {commentCount} comments
          </span>
        </CardContent>
      </Card>
    )
  }
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps)(withStyles(styles)(Post))
