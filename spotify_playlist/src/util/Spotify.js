/* 
Client ID 916d41d039784eb4af0c1922c7696fec
Client Secret 189041ab98864c0494968754c306f339 
*/
const client_id = '916d41d039784eb4af0c1922c7696fec';
const redirect_uri = 'http://localhost:3000/callback';
const spotifyUrl = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${client_id}&redirect_uri=${redirect_uri}`;
let accessToken = undefined;
let expiresIn = undefined;
        

const Spotify = {
   
    getAccessToken(){
        if (accessToken) {
            return accessToken;
        } else {
            const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
            const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
            
            if (urlAccessToken && urlExpiresIn) {
                accessToken = urlAccessToken[1];
                expiresIn = urlExpiresIn[1];
                console.log(accessToken, expiresIn);
                window.setTimeout(() => accessToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
            } else {
                window.location = spotifyUrl;
            } 
        }
    },

    search(searchTerm){
        return fetch((`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`), { 
            method: 'GET',
            headers: { 
                        'Content-type': 'application/json',
                         Authorization: `Bearer ${accessToken}` 
                    }
        })
        // Handle Successful Response
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request Failed!');
        // Log Unsuccessful Error
        }, networkError =>  console.log(networkError.message))
        // Handle JSON Promise
        .then(jsonResponse => {
            if (!jsonResponse) {
                return;
            } else {
                return jsonResponse.tracks.items.map(track => {
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }
                });
            }
        });
        
    },

    savePlaylist(playlistName, trackURIs) {
        if (!playlistName || !trackURIs || trackURIs === 0) {
            return;
        } 
        const headers = { Authorization: accessToken };
        let userId = undefined;
        let playlistId = undefined;
        // Get User ID from Spotify
        fetch('https://api.spotify.com/v1/me', {headers: headers})
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Request Failed!');
            }, networkError => console.log(networkError.message))
            .then(jsonResponse => {
                userId = jsonResponse.id;
            });
        // Create Playlist
        fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                'name': playlistName,
                'description': `A New ${playlistName} Playlist!`,
                'public': false
            })
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Request Failed!');
            }, networkError => console.log(networkError.message))
            .then(jsonResponse => {
                playlistId = jsonResponse.id;
            })
        // Add Tracks To Playlist
        fetch(`/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                'uris': trackURIs
            })
        })

    }
};

export default Spotify;