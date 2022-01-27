const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const songSchema = new Schema({
    title: {type: String},
    user:{
       type: Schema.Types.ObjectId,
       ref: 'user'

    },
    lyrics:[{
        type: Schema.Types.ObjectId,
        ref:'lyrics'
    }]
});

songSchema.statics.addLyrics = function(id, content){
   const Lyrics =  mongoose.model('lyrics');
   return this.findById(id)
   .then(song => {
            const lyric = new Lyrics({id, content})
            song.lyrics.push(lyric);

            return Promise.all([lyric.save(), song.save()])
            .then(([lyric, song]) => song);
   });
}

songSchema.statics.findLyrics = function(id){
    return this.findById(id)
    .populate('lyrics')
    .then(song => song.lyrics)
}



mongoose.model('song',songSchema)