const {gql} = require('apollo-server')

module.exports = gql`
    type Diary{
        id:ID!
        body:String!
        createdAt: String!
        username:String!
    }
    
    type User{
        id:ID!
        email:String!
        token:String!
        username:String!
    }


    type Memory{
        id:ID!
        body:String!
        assets:[Asset]
        comments:[Comment]!
        likes:[Like]!
        username:String!
        createdAt: String!
    }



    type Thought{
        id:ID!
        body:String!
        assetName:String!
        assetPath:String!
        comments:[Comment]!
        likes:[Like]!
        username:String!
        createdAt: String!
    }


    type Comment{
        id:ID!
        body:String!
        username:String!
        createdAt: String!
    }

    type Like{
        id:ID!
        username:String!
        createdAt: String!
    }
    
    type Asset{
        id:ID!
        name:String!
        path:String!
        username:String!
    }
    
    input RegisterInput{
        username:String!
        password:String!
        confirmPassword:String!
        email:String 
    }

    input LoginInput{
        username:String!
        password:String!
    }

    input CommentInput{
        postId:String!
        body:String!
    }


    input LikeInput{
        postId:String!
    }
    


    type Query{
        getDiaryItems: [Diary]
        getDiaryItem(diaryId:ID!): Diary

        getMemories: [Memory]
        getMemory(memoryId:ID!): Memory
        
        getThoughts: [Thought]
        getThought(thoughtId:ID!): Thought
        
    }
    
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(loginInput: LoginInput): User!
        
        createDiaryItem(body:String!): Diary!
        deleteDiaryItem(diaryId: ID!): String!

        createDiaryComment(diaryItemId:ID!, body:String!): Diary!
        deleteDiaryComment(diaryItemId:ID!, commentId:ID!): Diary!
        likeDiaryItem(diaryItemId:ID!): Diary!
        
        
        
        createMemory(body:String!): Memory!
        deleteMemory(memoryId: ID!): String!
        
        createMemoryComment(memoryItemId:ID!, body:String!): Memory!
        deleteMemoryComment(memoryItemId:ID!, commentId:ID!): Memory!
        likeMemoryItem(memoryItemId:ID!): Memory!
        

        
        
        createThought(body:String!): Thought!
        deleteThought(memoryId: ID!): String!
        
        createThoughtComment(thoughtItemId:ID!, body:String!): Thought!
        deleteThoughtComment(thoughtItemId:ID!, commentId:ID!): Thought!
        likeThoughtItem(thoughtItemId:ID!): Thought!
        
        
        
    }
    
    
    
`