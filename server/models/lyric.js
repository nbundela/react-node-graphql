const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lyricSchema = new Schema({
    likes: {type: Number, default: 0},
    content: {type: String},
    song:{
        ref:'song',
        type: Schema.Types.ObjectId
    }
});

lyricSchema.statics.likes= function(id){
   const Lyrics = mongoose.model('lyrics');
   return Lyrics.findById(id)
   .then(lyric => {
       ++lyric.likes;
       return lyric.save()
   })
}


mongoose.model('lyrics', lyricSchema)