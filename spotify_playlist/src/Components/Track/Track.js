import './Track.css';
import React from 'react';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
    }

    addTrack() {
        this.props.onAdd(this.props.track);
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
                <button className="Track-action" onClick={this.addTrack} >{/* + or - will go here */}+</button>
            </div>
        );
    }
}

export default Track;