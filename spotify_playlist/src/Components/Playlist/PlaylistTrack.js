import '../Track/Track.css';
import React from 'react';

class PlaylistTrack extends React.Component {
    constructor(props) {
        super(props);
        this.removeTrack = this.removeTrack.bind(this);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    render() {
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>
                        {/* track name will go here */}
                        {this.props.track.name}
                    </h3>
                    <p>
                        {/* track artist will go here--> | <!-- track album will go here */}
                        {this.props.track.artist} | {this.props.track.album}    
                    </p>
                </div>
                    <button className="Track-action" onClick={this.removeTrack} >-</button>
            </div>
        );
    }
}

export default PlaylistTrack;