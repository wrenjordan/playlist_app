import './TrackList.css';
import Track from '../Track/Track';
import React from 'react';

class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {/* You will add a map method that renders a set of Track components */}
                {this.props.tracks.map((track) => (
                    <Track key={track.id} track={track} onAdd={this.props.onAdd} />
                ))}
            </div>
        );
    }
}

export default TrackList;