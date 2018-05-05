import React, { Component } from 'react';
import './Track.css';


class Track extends Component {
  constructor(props) {
      super(props);

      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
    }

  addTrack() {
  // this.props.add = this.props.onAdd;
    this.props.onAdd(this.props.track);   //alternative copy from gitHub wrantal
  }

  removeTrack() {
    this.props.onRemove(this.props.track);   //alternative copy from gitHub wrantal
  }

  renderAction() {
    if (this.props.isRemoval) {
      return <a onClick = {this.removeTrack}>-</a>
    } else {
      return <a onClick ={this.addTrack}>+</a>
    }
  }


  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} {this.props.track.album}</p>
        </div>
        <a className="Track-action">{this.renderAction}</a>
      </div>
    );
  }
}

export default Track;
// TRACK WILL GO HERE
//<!-- track artist will go here--> | <!-- track album will go here -->
