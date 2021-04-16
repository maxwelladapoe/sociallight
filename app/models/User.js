const {model,Schema} = require('mongoose');

const userSchema = new Schema({
    firstName:String,
    lastName:String,
    username:String,
    password:String,
    email:String,

},  { timestamps: true });


module.exports= model('User', userSchema);
