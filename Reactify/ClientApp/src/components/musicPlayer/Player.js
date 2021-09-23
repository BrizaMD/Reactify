import React, {useEffect, useRef, useState} from 'react';
import PlayerDetails from './PlayerDetails.js';
import PlayerControls from './PlayerControls';

const Player = (props) => {
    const audioEl = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    /*needs dependency, enen if it should be called always
     isplaying should be dependency
     after route change it will be dleeted from DOM but it can be executed again if it stays in DOM
     so due to dependency it will be executed when needed*/
    useEffect(() => {
        if (isPlaying) {
            audioEl.current.play();
        } else {
            audioEl.current.pause();
        }
    });

    /*method should be named with lowercase if it is not a custom Hook*/
    const SkipSong = (forwards = true) => {
        if (forwards) {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp++;

                if (temp > props.songs.length - 1) {
                    temp = 0;
                }

                return temp;
            });
        } else {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp--;

                if (temp < 0) {
                    temp = props.songs.length - 1;
                }

                return temp;
            });
        }
    }


    return (
        <div className="c-player">
            <audio src={props.songs[props.currentSongIndex].preview} ref={audioEl}/>
            <h4>Playing now</h4>
            <PlayerDetails song={props.songs[props.currentSongIndex]}/>
            <PlayerControls isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                            SkipSong={SkipSong}/>
            <p><strong>Next up:</strong>
                {props.songs[props.nextSongIndex].title}
                by
                {props.songs[props.nextSongIndex].artist}
            </p>
        </div>
    );

}

export default Player;