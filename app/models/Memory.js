const {model,Schema} =require('mongoose');

const memorySchema = new Schema({
body:String,

    images:[
        {
            type:Schema({
                name:String,
                path:String
            }, {timestamps: true})

        }
    ],
    user:{
        type: Schema.Types.ObjectId,
        ref:'users'
    }
},{timestamps:true})

module.exports= (model('Memory', memorySchema));