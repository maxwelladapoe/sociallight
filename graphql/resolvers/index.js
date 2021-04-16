const diariesResolvers = require('./diaries');
const usersResolvers = require('./users');
const memoriesResolvers = require('./memories');
const thoughtsResolvers = require('./thoughts');



module.exports ={
    Query:{
        ...diariesResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation
    }

}