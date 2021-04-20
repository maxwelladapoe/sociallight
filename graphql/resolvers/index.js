const diariesResolvers = require('./diaries');
const usersResolvers = require('./users');
const memoriesResolvers = require('./memories');
const thoughtsResolvers = require('./thoughts');
const commentsResolvers = require('./comments');
const likesResolvers = require('./likes');


module.exports = {
    Query: {
        ...diariesResolvers.Query,
        ...thoughtsResolvers.Query,
        ...memoriesResolvers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...diariesResolvers.Mutation,
        ...thoughtsResolvers.Mutation,
        ...memoriesResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...likesResolvers.Mutation,
    }

}