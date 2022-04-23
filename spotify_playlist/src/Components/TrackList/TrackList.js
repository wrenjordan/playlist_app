import './TrackList.css';
import SearchResultsTrack from '../SearchResults/SearchResultsTrack';
import PlaylistTrack from '../Playlist/PlaylistTrack';
import React from 'react';

class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {/* You will add a map method that renders a set of Track components */}
                {this.props.tracks.map((track) => (
                    this.props.fromSearch === false ? <PlaylistTrack key={track.id} track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={false} /> :
                                                        <SearchResultsTrack key={track.id} track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={false} />
                ))}
            </div>
        );
    }
}

export default TrackList;