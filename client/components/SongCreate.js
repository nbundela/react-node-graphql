import React, { Component } from 'react';
import query from '../queries/fetchSongs';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {Link, hashHistory} from 'react-router'

class SongCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
    }
    onSubmit(e) {
      console.log(query)
      e.preventDefault();
      this.props.mutate({
          variables:{title: this.state.title},
          refetchQueries:[{query}]
      }).then(() => {
          hashHistory.push('/')
      })
    }
    render() {
        
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>Create New Song</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>song title</label>
                    <input type="text"
                    value={this.state.title} 
                    onChange={(event) => this.setState({title: event.target.value})}/>
                </form>
            </div>
        )
    }
}

const mutation = gql`
mutation AddMute($title: String) {
    addSong(title: $title){
      title
      id
    }
  }
`;

//$title auto receive variable

export default graphql(mutation)(SongCreate);
