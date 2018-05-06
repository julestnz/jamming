import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends Component {
  constructor(props) {
  super(props);

  this.handleNameChange = this.handleNameChange.bind(this);
  };


  handleNameChange(event){
    //this.setState({onNameChange: event.target.value});
    //setting the state to the target value from the Playlist input
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={"New Playlist"}
                value={this.props.playlistName}
               onChange={this.handleNameChange}/>
        <TrackList tracklist = {this.props.playlistTracks}
           onRemove = {this.props.onRemove}
           isRemoval = {true}/>
        <a className="Playlist-save"
          onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
