
const clientId = '1a131bbede314fd6959a1505e97271c6';
const clientSecret = '7157f929f7f8440fb86b20c1364aa5f6';
const redirectURI = 'http://localhost:3000/callback/';

let accessToken='';
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
const Spotify = {

  getAccessToken() {
     if (!accessToken) {
       console.log('HIYA SPotify getAccessToken ' );
      // let urlToGo = '';
        let urlToGo = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectURI}&scope=playlist-modify-public&response_type=token` ;
        console.log('URL = ' + urlToGo );
        window.location = urlToGo;
    //    accessToken = getParameterByName('access_token', window.location.href);
        accessToken = window.location.href.match(/access_token=([^&]*)/);
        let expiry = getParameterByName('expires_in', window.location.href);
        console.log('token = ' + accessToken);
        console.log('expires = ' + expiry);
        window.setTimeout(() => accessToken = '', expiry * 1000);
        window.history.pushState('Access Token', null, '/');

     } else {
         console.log('Your token is : ' + accessToken);
         return accessToken
       }
  },

  search(term) {
    console.log(` search = https://api.spotify.com/v1/search?type=track&q=${term}`);
    console.log(` search access token ${accessToken}`);
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}` , {
      headers: {Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      console.log(response);
       return response.json();
     }).then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          URI: track.uri
       }));
     }
  });
}

};
export default Spotify;
