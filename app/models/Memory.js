const {model,Schema} =require('mongoose');

const memorySchema = new Schema({
body:String,

    assets:[
        {
            type:Schema({
                name:String,
                path:String,
                username: String,
            }, {timestamps: true})

        }
    ],
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


    user:{
        type: Schema.Types.ObjectId,
        ref:'users'
    }
},{timestamps:true})

module.exports= model('Memory', memorySchema);