import graphql from 'graphql';
const mongoose = require('mongoose');
const {
 GraphQLObjectType,
 GraphQLSchema,
 GraphQLInt, GraphQLString,
 GraphQLID,
 GraphQLNonNull,
 GraphQLList
} = graphql;

const Song = mongoose.model('song');

const SongType = new GraphQLObjectType({
    name: 'Songs',
    fields:() => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        lyrics:{
            type: new GraphQLList(LyricsType),
            resolve(parentValue, args) {
                //mongo call
                return Song.findLyrics(parentValue.id)
            }
        }
    })
})

const LyricsType = new GraphQLObjectType({
    name: 'Lyrics',
    fields:() => ({
        id: {type: GraphQLID},
        content: {type: GraphQLString},
        likes: {type: GraphQLInt},
        song:{
            type: SongType,
            async resolve(parentValue, args) {
                //mongo call
                
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:() => ({
        songs:{
            type: new GraphQLList(SongType),
            async resolve(parentValue, args) {
                //mongo call
            }
        },
        song:{
            type: SongType,
            args:{id :{type: new GraphQLNonNull(GraphQLID)}},
            async resolve(parentValue, args) {
                //mongo call
            }
        },
        lyrics:{
            type: LyricsType,
            args:{id: {type: new GraphQLNonNull(GraphQLID)}},
            async resolve(parentValue, args){
                //mongo call
            }
        }
    })
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addSong:{
            type: SongType,
            args:{title: {type: GraphQLString}},
            async resolve(parentValue, args){
                //mongo call
            }
        },
        deleteSong:{
            type: LyricsType,
            args:{id: {type: GraphQLID}},
            async resolve(parentValue, args){
                //mongo call
            }
        },
        addLyricsToSong:{
            type: LyricsType,
            args:{
                SongId: {type: GraphQLID},
                content: {type: GraphQLString}
            },
            async resolve(parentValue, args){
                //mongo call
            }
        },
        likeLyric:{
            type: LyricsType,
            args:{id: {type: GraphQLID}},
            async resolve(parentValue, args){
                //mongo call
            }
        }   
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})

