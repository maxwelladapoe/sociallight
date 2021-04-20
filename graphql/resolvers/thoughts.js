const Thought = require('../../app/models/Thought');
const checkAuth = require('../../utils/checkAuth');

module.exports = {
    Query: {
        async getThoughts() {
            try {
                return await Thought.find().sort({createdAt: -1});
            } catch (e) {
                throw  new Error(e)
            }
        },

        async getThought(_, {thoughId}) {
            try {
                const thought = await Thought.findById(thoughId);
                if (!thought) {
                    throw new Error('Thought item not found')
                }
                return thought;

            } catch (e) {
                throw  new Error(e);
            }
        }
    },


    Mutation:{
        async createThought(_,{body}, context){
            const user = checkAuth(context);

            const newThoughtItem = new Thought({
                body,
                user: user.id,
                username: user.username,
            });
            return await newThoughtItem.save();
        }
    }
}