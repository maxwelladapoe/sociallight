const {model,Schema} = require('mongoose')


const thoughtSchema = new Schema({
    username: String,
    body: String,
    images_path:String,
    comments: [
        {
            type: new mongoose.Schema(
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

module.exports(model('Thought',thoughtSchema));