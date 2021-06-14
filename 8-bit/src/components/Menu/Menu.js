import React, { useState } from "react";
import styles from "./Menu.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const transition = { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.9] };

const slideUp = {
  initial: { y: 200 },
  animate: { y: 0 },
};

const parent = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.8,
    },
  },
};

const lineAnimate = {
  initial: { width: "100%" },
  animate: { width: 0 },
};

const Panels = () => {
  const [finishedAnimate, setFinishedAnimate] = useState(false);
  return (
    <>
      <motion.div
        style={{ background: finishedAnimate ? "#e7e7de" : "#e7dee7" }}
        initial={{ height: 0 }}
        animate={{ height: [0, window.innerHeight, 0], bottom: [null, 0, 0] }}
        exit={{ height: [0, window.innerHeight, 0], top: [null, 0, 0] }}
        transition={{ ...transition, duration: 2, times: [0, 0.5, 1] }}
        className={styles.leftPanel}
      ></motion.div>
      <motion.div
        style={{ background: finishedAnimate ? "#e7e7de" : "#e7dee7" }}
        initial={{ height: 0 }}
        animate={{
          height: [0, window.innerHeight, 0],
          bottom: [0, 0, window.innerHeight],
        }}
        exit={{ height: [0, window.innerHeight, 0], bottom: [null, 0, 0] }}
        transition={{ ...transition, duration: 2, times: [0, 0.5, 1] }}
        onAnimationComplete={() => {
          setFinishedAnimate(!finishedAnimate);
        }}
        className={styles.rightPanel}
      ></motion.div>
    </>
  );
};

const Menu = () => {

  const { currentUser, logout } = useAuth();

  function handleLogout() {
    logout();
  }

  if (!currentUser) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ visibility: "hidden" }}
          animate={{ visibility: "visible", transition: { delay: 1 } }}
          exit={{ visibility: "hidden", transition: { delay: 1 } }}
          className={styles.navigation}
        >
          <div className={styles.menuTitle}> Navigation </div>
          <div className={styles.menu}>
            <div className={styles.container}>
              <div className={styles.menuInner}>
                <motion.ul
                  className={styles.unorderedList}
                  variants={parent}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <motion.li className={styles.list}>
                    <Link to="/" className={styles.home}>
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
                  <li className={styles.list}>
                    <Link to="/Forum" className={styles.home}>
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
                              Forum
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
                  </li>
                  <li className={styles.list}>
                    <Link to="/Leaderboard" className={styles.home}>
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
                              Leaderboard
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
                    <Link to="/Login" className={styles.home}>
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
                              Login
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
                </motion.ul>
              </div>
            </div>
          </div>
        </motion.div>
        <Panels />
      </AnimatePresence>
    );
  } else {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ visibility: "hidden" }}
          animate={{ visibility: "visible", transition: { delay: 1 } }}
          exit={{ visibility: "hidden", transition: { delay: 1 } }}
          className={styles.navigation}
        >
          <div className={styles.menuTitle}> Navigation </div>
          <div className={styles.menu}>
            <div className={styles.container}>
              <div className={styles.menuInner}>
                <motion.ul
                  className={styles.unorderedList}
                  variants={parent}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <motion.li className={styles.list}>
                    <Link to="/" className={styles.home}>
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
                  <li className={styles.list}>
                    <Link to="/Forum" className={styles.home}>
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
                              Forum
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
                  </li>
                  <li className={styles.list}>
                    <Link to="/Leaderboard" className={styles.home}>
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
                              Leaderboard
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
                    <Link to="/Login" className={styles.home}>
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
                              Profile
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
                    <Link to="/Login" className={styles.home}>
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
                              onClick={ handleLogout }
                              className={styles.text}
                              variants={slideUp}
                              transition={transition}
                            >
                              Logout
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
                </motion.ul>
              </div>
            </div>
          </div>
        </motion.div>
        <Panels />
      </AnimatePresence>
    );
  }
};

export default Menu;
