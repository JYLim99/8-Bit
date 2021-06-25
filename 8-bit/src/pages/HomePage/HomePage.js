import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={ styles.background }>
      <div className={ styles.header }> 8 Bit </div>
      <button className={ styles.getStartedBtn }> Get started </button>
    </div>
  );
};

export default HomePage;
