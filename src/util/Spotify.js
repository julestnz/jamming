
const clientID = '1a131bbede314fd6959a1505e97271c6';
const clientSecret = '7157f929f7f8440fb86b20c1364aa5f6';
const redirectURI = 'http://julestnz.surge.sh' //'http://localhost:3000/callback/';

let accessToken;
let expiresIn;

const Spotify = {

  getAccessToken(){
    const url = window.location.href;
    const token = url.match(/access_token=([^&]*)/);
    const time = url.match(/expires_in=([^&]*)/);
    if (accessToken){
      return accessToken;
    } else if (token && time){
      accessToken = token[1];
      expiresIn = time[1];
      window.setTimeout(()=> accessToken = null, expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token`;
    }
  },

  search(term){
//   this.getAccessToken();
   return fetch(`https://api.spotify.com/v1/search?type=track&limit=20&q=${term}`, {
     headers: {
       Authorization: `Bearer ${accessToken}`}
   }).then(response => {
     if (response.ok) {
       return response.json();
     }
     throw new Error('Request Failed!');
   }, networkError => console.log(networkError.message)
   ).then(jsonResponse => {
     if (jsonResponse.tracks) {
       return jsonResponse.tracks.items.map(track => ({
         id: track.id,
         title: track.name,
         artist: track.artists[0].name,
         album: track.album.name,
         uri: track.uri
       }));
     } else {
       return [];
     }
   });
 },

 savePlaylist(name, list){
  this.getAccessToken();
  let user_id
  let playlist_id
  if (name && list) {
    return fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`}
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('uer ID Request Failed!');
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      return user_id = jsonResponse.id;
      console.log(user_id);
    }).then(()=> {
      return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
        headers: {Authorization: `Bearer ${accessToken}`},
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Playlist Request Failed!');
      }, networkError => console.log(networkError.message)
      ).then(jsonResponse => {
        return playlist_id = jsonResponse.id;
      });
    }).then(()=> {
      return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`, {
        headers: {
          Authorization: `Bearer ${accessToken}`},
        method: 'POST',
        body: JSON.stringify({uris: list})
      }).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(' Playlist tracks update Request Failed!');
      }, networkError => console.log(networkError.message)
      ).then(jsonResponse => {
      });
    });
  } else {
    return;
  }
}
};
export default Spotify;
