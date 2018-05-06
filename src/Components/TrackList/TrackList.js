import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track'

class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracklist.map(track => {
           return <Track onAdd = {this.props.onAdd}
                         track={track}
                         key={track.id}
                         onRemove = {this.props.onRemove}
                        isRemoval={this.props.isRemoval}/>
         })
      }
      </div>
    );
  }
}


export default TrackList;
