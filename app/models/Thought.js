const {model, Schema} = require('mongoose')


const thoughtSchema = new Schema({
    username: String,
    body: String,
    assetPath: String,
    assetName:String,
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
                    username: String,
                }, {timestamps: true}
            )
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }

}, {timestamps: true})

module.exports = model('Thought', thoughtSchema);