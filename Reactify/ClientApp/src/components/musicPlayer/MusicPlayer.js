import axios from "axios";
import React, { useEffect, useState } from 'react';
import './MusicPlayer.css';
import Player from './Player.js';
import { useLocation } from "react-router-dom";

const MusicPlayer = (detail) => {
    const [songs, setSongs] = useState({});

    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);
    /* uselocation is not needed, top level component
     * albumid should be get as route parameter as in tracklist component*/
    const location = useLocation();
    const [isAlbumReady, setIsAlbumReady] = useState(false);

    useEffect(() => {
        console.log(location.state.detail)
        axios
            .get(`player?albumId=${location.state.detail}`)
            .then(
                res => {
                    setSongs(res.data);
                    setIsAlbumReady(true);
                })
    }, []);

    /*here should be handled next songs, not in Player, not to set state there, Player should just be a view component and MusicPlayer contains logic
     useCallback - can be used if musicPlayer rendered lots of times - helps performance if needed
     state management should be here not in child
     setState should be called where it is used
     new state should be passed down to player, not the setState*/
    useEffect(() => {
        setNextSongIndex(() => {
            if (currentSongIndex + 1 > songs.length - 1) {
                return 0;
            } else {
                return currentSongIndex + 1;
            }
        })
    }, [currentSongIndex]);

    return (
        <div className="MusicPlayer" data-testid="music-player">
            {isAlbumReady ?
                <Player
                    currentSongIndex={currentSongIndex}
                    {/*setCurrentSongIndex should not be passed down to children - antipattern
                     this logic should be handled here, and not in its child
                     Player should get onNextSong eventhandler or etc*/}
                    setCurrentSongIndex={setCurrentSongIndex}
                    nextSongIndex={nextSongIndex}
                    songs={songs}
                />
                :
                <div>:(</div>
            }
        </div >
    );
}

export default MusicPlayer;