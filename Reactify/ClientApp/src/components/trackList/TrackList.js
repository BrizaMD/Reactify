import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import './TrackList.css';

const TrackList = (props) => {
    const [songs, setSongs] = useState();
    const [isResultAvailable, setResultAvailable] = useState(false);
    const [albumId, setAlbumId] = useState("");

    
    useEffect(() => {
        axios
            .get(`track?track=${props.match.params.track}`)
            .then(
                res => {
                    setSongs(res.data)
                    setResultAvailable(true);
                    console.log(res.data);
                })
    }, [props.match.params.track])
    /*pathname: /player + albumid, with match.params, so historyState will not be needed
     so we will follow tha path via url
     use historystate if it cannot be followed via url, but use url if possible*/
    const history = useHistory();
    const goToPlayer = () => history.push({
        pathname: "/player",
        state: { detail: albumId }
    });


    return (
        <div className="container">
            {isResultAvailable ?
                <ul className="list">

                    {songs.map(song => (
                        /*key is needed, must have*/
                        <li className="num"
                            onClick={goToPlayer}
                            name={song.album.id}
                            onMouseOver={(e) => {
                                setAlbumId(song.album.id)
                            }}>
                            <h3><img src={song.album.cover} alt="" /></h3>
                            <h3><strong> {song.title}</strong></h3>
                            <h3>{song.artist.name}</h3>
                        </li>
                    )
                    )}

                </ul>
                : <></>
            }
        </div>
    )
}

export default TrackList;