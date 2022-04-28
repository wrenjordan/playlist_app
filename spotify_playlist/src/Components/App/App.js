import './App.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

Spotify.getAccessToken();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [],
                    playlistName: 'Create Playlist Name Here',
                    playlistTracks: [], 
                };
    this.addTrack = this.addTrack.bind(this); 
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => (savedTrack.id === track.id))) {
      return;
    } else {
      this.state.playlistTracks.push(track);
      this.setState({playlistTracks: this.state.playlistTracks});
    }
  }

  removeTrack(track) {
    this.state.playlistTracks.pop(track);
    this.setState({playlistTracks: this.state.playlistTracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris);
    this.setState({
      searchResults: [],
      playlistTracks: []
    });
    this.updatePlaylistName('Create Another Playlist');
  }

  search(searchTerm) {
    Spotify.search(searchTerm)
      .then(searchResults => {
        this.setState({searchResults: searchResults});
      });
  }

  render() {
    return (
      <div>
        <h1>Spotify <span className="highlight">Playlist </span>App</h1>
        <div className="App">
          {/* Add a SearchBar component */}
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            {/* Add a SearchResults component */}
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            {/* Add a Playlist component */}
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} />
          </div>
        </div>
    </div>
    );
  }
}

export default App;
