import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Post from '../../components/Forum/Post'
import Profile from '../../components/Profile'
import Grid from '@material-ui/core/Grid'
import styles from './Dashboard.module.css'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import ProfileSkeleton from '../../util/ProfileSkeleton'
import PostSkeleton from '../../util/PostSkeleton'

import { db } from '../../config/firebase'
import { connect } from 'react-redux'
import { getUserData } from '../../redux/actions/dataActions'

class Dashboard extends Component {
  state = {
    profile: null,
    postIdParam: null,
    scores: [],
  }

  componentDidMount() {
    const handle = this.props.match.params.handle
    const postId = this.props.match.params.postId

    const fillScores = async () =>
      await db
        .collection('users')
        .doc(handle)
        .get()
        .then((doc) => {
          if (doc && doc.exists) {
            this.state.scores.push(doc.data().breakout)
            this.state.scores.push(doc.data().pong)
            this.state.scores.push(doc.data().spaceInvaders)
          }
        })

    fillScores()

    if (postId) this.setState({ postIdParam: postId })

    this.props.getUserData(handle)
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        })
      })
      .catch((err) => console.log(err))
  }

  render() {
    const { posts, loading } = this.props.data
    const { postIdParam } = this.state

    let postsMarkup = loading ? (
      <PostSkeleton />
    ) : posts === null ? (
      <p>No posts from this user</p>
    ) : !postIdParam ? (
      posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      posts.map((post) => {
        if (post.postId !== postIdParam)
          return <Post key={post.postId} post={post} />
        else return <Post key={post.postId} post={post} openDialog />
      })
    )

    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <Grid container spacing={4}>
            <Grid item sm={7} xs={12}>
              {postsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
              {this.state.profile === null ? (
                <ProfileSkeleton />
              ) : (
                <>
                  <Profile />
                  <Card className={styles.scoresContainer}>
                    <CardContent className={styles.scoresTitle}>
                      User Scores
                    </CardContent>
                    <CardContent className={styles.scores}>
                      Breakout:
                      <span className={styles.separator1} />
                      {this.state.scores[0] ? this.state.scores[0] : '---'}
                    </CardContent>
                    <CardContent className={styles.scores}>
                      Pong:
                      <span className={styles.separator2} />
                      {this.state.scores[1] ? this.state.scores[1] : '---'}
                    </CardContent>
                    <CardContent className={styles.scores}>
                      Space Invaders: <span className={styles.separator3} />
                      {this.state.scores[2] ? this.state.scores[2] : '-----'}
                    </CardContent>
                  </Card>
                </>
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getUserData: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
})

export default connect(mapStateToProps, { getUserData })(Dashboard)
