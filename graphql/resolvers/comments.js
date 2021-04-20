const Diary = require('../../app/models/Diary');
const Thought = require('../../app/models/Thought');
const Memory = require('../../app/models/Memory');
const {UserInputError, AuthenticationError} = require('apollo-server')

const checkAuth = require('../../utils/checkAuth');



 async function addComment(item, body, context) {
    const {username} = checkAuth(context);
    if (body.trim() === "") {
        throw new UserInputError('Empty Comment', {
            errors: {
                body: 'Comment body must not be empty'
            }
        })
    } else {
        if (item) {
            item.comments.unshift({
                body,
                username
            })
            return await item.save();
        } else {
            throw new UserInputError('The item you are looking for does not exist')
        }
    }


}
async function deleteComment(item, commentId, context) {
    const {username} = checkAuth(context);

    if (item) {
        let commentIndex = item.comments.findIndex(c => c.id === commentId);

        if (item.comments[commentIndex].username === username) {
            item.comments.splice(commentIndex, 1);
            await item.save();
            return item;
        } else {
            throw new AuthenticationError('Action not allowed')

        }
    }
}
module.exports = {


    Mutation: {

        async createDiaryComment(_, {diaryItemId, body}, context) {

         try{
             const diaryItem = await Diary.findById(diaryItemId);
             if(diaryItem){
                 await addComment(diaryItem,body,context)
             }else{
                 throw new UserInputError('Item not found')
             }


         }catch (e) {
             throw new Error(e);
         }



        },
        async deleteDiaryComment(_, {diaryItemId, commentId}, context) {

            try {
                const diaryItem = await Diary.findById(diaryItemId);

                if (diaryItem) {
                 await deleteComment(diaryItem,commentId,context)
                }else{
                    throw new UserInputError('Item not found')
                }


            } catch (e) {
                throw new Error(e);
            }

        },


        async createMemoryComment(_, {memoryId, body}, context) {
            try {
                const memory = await Memory.findById(memoryId);

                if (memory) {
                    await addComment(memory, body, context)
                }else{
                    throw new UserInputError('Item not found')
                }

            } catch (e) {
                throw new Error(e);
            }


        },
        async deleteMemoryComment(_, {memoryId, commentId}, context) {

            try {
                const memory = await Memory.findById(memoryId);

                if (memory) {
                    await deleteComment(memory, commentId, context);
                }else{
                    throw new UserInputError('Item not found')
                }


            } catch (e) {
                throw new Error(e);
            }

        },


        async createThoughtComment(_, {thoughtId, body}, context) {
            try {
                const thought = await Thought.findById(thoughtId);
                if (thought) {
                    await addComment(thought, body, context);
                }else{
                    throw new UserInputError('Item not found')
                }
            } catch (e) {
                throw new Error(e);
            }
        },
        async deleteThoughtComment(_, {thoughtId, commentId}, context) {
            try {
                const thought = await Thought.findById(thoughtId);
                if (thought){
                    await deleteComment(thought, commentId, context);
                }else{
                    throw new UserInputError('Item not found')
                }

            } catch (e) {
                throw new Error(e);
            }

        },



    }



}