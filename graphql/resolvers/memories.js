const Memory = require('../../app/models/Memory');
const checkAuth = require('../../utils/checkAuth');

module.exports = {
    Query: {
        async getMemories() {
            try {
                return await Memory.find().sort({createdAt: -1});
            } catch (e) {
                throw  new Error(e)
            }
        },

        async getMemory(_, {thoughId}) {
            try {
                const memory = await Memory.findById(thoughId);
                if (!memory) {
                    throw new Error('Memory not found')
                }
                return memory;

            } catch (e) {
                throw  new Error(e);
            }
        }
    },


    Mutation: {
        async createMemory(_, {body}, context) {
            const user = checkAuth(context);

            const newMemory = new Memory({
                body,
                user: user.id,
                username: user.username,
            });
            return await newMemory.save();
        },

        async deleteMemory(_, {memoryId}, context) {
            const user = checkAuth(context)
            try {
                const memory = await Memory.findById(memoryId);
                console.log("Compare memory", memory.user === user.id)
                if (memory.username === user.username) {
                    await memory.delete();
                    return 'Memory deleted Successfully'
                } else {
                    throw new AuthenticationError('Action not allowed')

                }
            } catch (e) {
                throw new Error(e);
            }


        }
    }
}

