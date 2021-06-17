import { useState } from 'react';
import styles from './Panels.module.css';
import { motion } from 'framer-motion';

const Panels = () => {

    const transition = { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.9] };
    
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
}

export default Panels;