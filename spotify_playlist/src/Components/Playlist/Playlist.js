import './Playlist.css';
import TrackList from '../TrackList/TrackList';
import React from 'react';

class Playlist extends React.Component{
    render(){

        return (
            <div className="Playlist">
                <input value="New Playlist"/>
                {/* Add a TrackList component */}
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={false} fromSearch={false} />
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
}

export default Playlist;