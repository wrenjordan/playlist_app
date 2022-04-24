import './Playlist.css';
import TrackList from '../TrackList/TrackList';
import React from 'react';

class Playlist extends React.Component{
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e) {
        this.props.onNameChange(e.target.value);
    }
    
    render() {
        return (
            <div className="Playlist">
                <input value={this.props.playlistName} onChange={this.handleNameChange} />
                {/* Add a TrackList component */}
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={false} fromSearch={false} />
                <button className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</button>
            </div>
        );
    }
}

export default Playlist;