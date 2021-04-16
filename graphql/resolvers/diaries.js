const Diaries = require('../../app/models/Diary')
module.exports ={
    Query: {
        async getDiaries() {
            try{
                return await Diaries.find();
            } catch (e) {
                throw  new Error(e)
            }
        }
    }

}