import React, { Component } from 'react'
import styles from './Forum.module.css'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

import Post from '../../components/Forum/Post/Post'
import Profile from '../../components/Profile'
import PostSkeleton from '../../util/PostSkeleton'

import { connect } from 'react-redux'
import { getPosts } from '../../redux/actions/dataActions'

class Forum extends Component {
  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    const { posts, loading } = this.props.data
    let recentPostsMarkup = !loading ? (
      posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      <PostSkeleton />
    )
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <Grid container spacing={4}>
            <Grid item sm={7} xs={12}>
              {recentPostsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
              <Profile />
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

Forum.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  data: state.data,
})

export default connect(mapStateToProps, { getPosts })(Forum)
