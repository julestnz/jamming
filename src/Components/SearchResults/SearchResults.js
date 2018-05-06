import React, { Component } from 'react';
import './SearchResults.css';
//import Track from '../Track/Track'
import TrackList from '../TrackList/TrackList';

class SearchResults extends Component {

  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
          <TrackList isRemoval = {false} onAdd = {this.props.onAdd} tracklist = {this.props.searchResults}/>
      </div>
    );
  }
}

export default SearchResults;

//Pass isRemoval with a valueof false down to TrackList
