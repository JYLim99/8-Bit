import React, { Component } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import styles from './MenuAuth.module.css'
import Panels from '../PanelMenu/Panels'
import PropTypes from 'prop-types'

//Redux stuff
import { connect } from 'react-redux'
import { logoutUser } from '../../redux/actions/userActions'

const transition = { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.9] }

const slideUp = {
  initial: { y: 200 },
  animate: { y: 0 },
}

const parent = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.8,
    },
  },
}

const lineAnimate = {
  initial: { width: '100%' },
  animate: { width: 0 },
}

class MenuAuth extends Component {
  handleLogout = () => {
    this.props.logoutUser()
  }

  render() {
    const {
      user: {
        credentials: { handle },
      },
    } = this.props
    return (
      <>
        <motion.div
          initial={{ visibility: 'hidden' }}
          animate={{ visibility: 'visible', transition: { delay: 1 } }}
          exit={{ visibility: 'hidden', transition: { delay: 1 } }}
          className={styles.navigation}
        >
          <div className={styles.menuTitle}> Navigation </div>
          <div className={styles.menu}>
            <div className={styles.container}>
              <div className={styles.menuInner}>
                <motion.ul
                  className={styles.unorderedList}
                  variants={parent}
                  initial='initial'
                  animate='animate'
                  exit='exit'
                >
                  <motion.li className={styles.list}>
                    <Link to='/' className={styles.home}>
                      <div className={styles.wrapper}>
                        <div className={styles.lineLeft1}>
                          <motion.div
                            className={styles.maskLeft}
                            variants={lineAnimate}
                            transition={{ ...transition, duration: 1 }}
                          ></motion.div>
                        </div>
                        <div className={styles.title}>
                          <h2 className={styles.menuHeader}>
                            <motion.div
                              className={styles.text}
                              variants={slideUp}
                              transition={transition}
                            >
                              Home
                            </motion.div>
                          </h2>
                        </div>
                        <div className={styles.lineRight}>
                          <motion.div
                            className={styles.maskRight}
                            variants={lineAnimate}
                            transition={{ ...transition, duration: 1 }}
                          ></motion.div>
                        </div>
                      </div>
                    </Link>
                  </motion.li>
                  {/* <li className={styles.list}>
						  <Link to="/Games" className={styles.home}>
							<div className={styles.wrapper}>
							  <div className={styles.lineLeft2}>
								<motion.div
								  className={styles.maskLeft}
								  variants={lineAnimate}
								  transition={{ ...transition, duration: 1 }}
								></motion.div>
							  </div>
							  <div className={styles.title}>
								<h2 className={styles.menuHeader}>
								  <motion.div
									className={styles.text}
									variants={slideUp}
									transition={transition}
								  >
									Games
								  </motion.div>
								</h2>
							  </div>
							  <div className={styles.lineRight2}>
								<motion.div
								  className={styles.maskRight}
								  variants={lineAnimate}
								  transition={{ ...transition, duration: 1 }}
								></motion.div>
							  </div>
							</div>
						  </Link>
						</li> */}
                  <li className={styles.list}>
                    <Link to='/Forum' className={styles.home}>
                      <div className={styles.wrapper}>
                        <div className={styles.lineLeft3}>
                          <motion.div
                            className={styles.maskLeft}
                            variants={lineAnimate}
                            transition={{ ...transition, duration: 1 }}
                          ></motion.div>
                        </div>
                        <div className={styles.title}>
                          <h2 className={styles.menuHeader}>
                            <motion.div
                              className={styles.text}
                              variants={slideUp}
                              transition={transition}
                            >
                              Forum
                            </motion.div>
                          </h2>
                        </div>
                        <div className={styles.lineRight3}>
                          <motion.div
                            className={styles.maskRight}
                            variants={lineAnimate}
                            transition={{ ...transition, duration: 1 }}
                          ></motion.div>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className={styles.list}>
                    <Link to='/Leaderboard' className={styles.home}>
                      <div className={styles.wrapper}>
                        <div className={styles.lineLeft4}>
                          <motion.div
                            className={styles.maskLeft}
                            variants={lineAnimate}
                            transition={{ ...transition, duration: 1 }}
                          ></motion.div>
                        </div>
                        <div className={styles.title}>
                          <h2 className={styles.menuHeader}>
                            <motion.div
                              className={styles.text}
                              variants={slideUp}
                              transition={transition}
                            >
                              Leaderboard
                            </motion.div>
                          </h2>
                        </div>
                        <div className={styles.lineRight4}>
                          <motion.div
                            className={styles.maskRight}
                            variants={lineAnimate}
                            transition={{ ...transition, duration: 1 }}
                          ></motion.div>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className={styles.list}>
                    <Link to={`/users/${handle}`} className={styles.home}>
                      <div className={styles.wrapper}>
                        <div className={styles.lineLeft5}>
                          <motion.div
                            className={styles.maskLeft}
                            variants={lineAnimate}
                            transition={{ ...transition, duration: 1 }}
                          ></motion.div>
                        </div>
                        <div className={styles.title}>
                          <h2 className={styles.menuHeader}>
                            <motion.div
                              className={styles.text}
                              variants={slideUp}
                              transition={transition}
                            >
                              Dashboard
                            </motion.div>
                          </h2>
                        </div>
                        <div className={styles.lineRight5}>
                          <motion.div
                            className={styles.maskRight}
                            variants={lineAnimate}
                            transition={{ ...transition, duration: 1 }}
                          ></motion.div>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className={styles.list}>
                    <Link to='/' className={styles.home}>
                      <div className={styles.wrapper}>
                        <div className={styles.lineLeft6}>
                          <motion.div
                            className={styles.maskLeft}
                            variants={lineAnimate}
                            transition={{ ...transition, duration: 1 }}
                          ></motion.div>
                        </div>
                        <div className={styles.title}>
                          <h2 className={styles.menuHeader}>
                            <motion.div
                              onClick={this.handleLogout}
                              className={styles.text}
                              variants={slideUp}
                              transition={transition}
                            >
                              Logout
                            </motion.div>
                          </h2>
                        </div>
                        <div className={styles.lineRight6}>
                          <motion.div
                            className={styles.maskRight}
                            variants={lineAnimate}
                            transition={{ ...transition, duration: 1 }}
                          ></motion.div>
                        </div>
                      </div>
                    </Link>
                  </li>
                </motion.ul>
              </div>
            </div>
          </div>
        </motion.div>
        <Panels />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapActionsToProps = { logoutUser }

MenuAuth.propTypes = {
  logoutUser: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapActionsToProps)(MenuAuth)
