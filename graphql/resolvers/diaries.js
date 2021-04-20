const {AuthenticationError} =require( "apollo-server");

const Diary = require('../../app/models/Diary');
const checkAuth = require('../../utils/checkAuth');
module.exports = {
    Query: {
        async getDiaryItems() {
            try {
                return await Diary.find().sort({createdAt: -1});
            } catch (e) {
                throw  new Error(e)
            }
        },

        async getDiaryItem(_, {diaryId}) {
            try {
                const diary = await Diary.findById(diaryId);
                if (!diary) {
                    throw new Error('Diary item not found')
                }
                return diary;

            } catch (e) {
                throw  new Error(e);
            }
        },

    },


    Mutation: {
        async createDiaryItem(_, {body}, context) {
            const user = checkAuth(context);

            const newDiaryItem = new Diary({
                body,
                user: user.id,
                username: user.username,
            });
            return await newDiaryItem.save();
        },

        async deleteDiaryItem(_, {diaryId}, context) {
            const user = checkAuth(context);
            try {
                const diaryItem = await Diary.findById(diaryId);
                if (user.username === diaryItem.username) {
                    //you can delete

                    await diaryItem.delete();
                    return 'Diary Item deleted Successfully'
                }else{
                    throw new AuthenticationError('Action not allowed')
                }
            } catch (e) {
                throw new Error(e);
            }

        }

    }


}