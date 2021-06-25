import React, { useState, useEffect, useRef } from "react";
import Music from '../../images/music.png';
import TownTheme from '../../music/TownTheme.mp3';
import styles from './MusicPlayer.module.css';

const MusicPlayer = () => {

    let audio = new Audio(TownTheme);
    audio.volume = 0.3;
    const audioRef = useRef(audio)
    const [ musicPlay, setMusicPlay ] = useState(true);

    const handleMusic = () => {
        setMusicPlay(!musicPlay)
    }

    useEffect(() => {
        musicPlay ? audioRef.current.play() : audioRef.current.pause();
    },[musicPlay])

    return (
        <img className={ styles.musicPlayer }src={ Music } alt="Music" onClick={ handleMusic }/>
    );
}
 
export default MusicPlayer;