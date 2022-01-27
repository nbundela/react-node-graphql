import React, { Component } from 'react'
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class LyricList extends Component {
    constructor(props) {
        super(props)
        this.state = {
             
        }
    }
    onLike(id, likes) {
        this.props.mutate({
            variables:{id},
            optimisticResponse:{
                __typename:'Mutation',
                likeLyric:{
                    id,
                    likes:likes+1,
                    __typename:"LyricType"}
            }
        })
    }

    renderList() {
        console.log(this.props.lyrics)
        return this.props.lyrics.map(({id,content,likes}) => {
            return (
                <li key={id} className="collection-item">
                    {content}
                    <div className="right">
                    {likes}
                    <i className="material-icons right"
                    onClick={() => this.onLike(id, likes)}>thumb_up</i>
                    </div>
                    
                </li>
            )
        })
    }
    
    render() {
        return (
            <ul className="collection">
                {this.renderList()}
            </ul>
        )
    }
}

const mutation = gql`
mutation onLike( $id: ID!){
    likeLyric(id: $id){
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
