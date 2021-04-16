const {model, Schema} = require('mongoose');

const diarySchema = new Schema({
    username: String,
    body: String,
    comments: [
        {
            type: new Schema(
                {
                    body: String,
                    username: String,
                }, {timestamps: true}
            )
        }

    ],
    likes: [
        {
            type: new Schema(
                {
                    body: String,
                    username: String,
                }, {timestamps: true}
            )
        }
    ],
    user:{
        type: Schema.Types.ObjectId,
        ref:'users'
    }

}, {timestamps: true})

module.exports = model('DiaryPost', diarySchema)