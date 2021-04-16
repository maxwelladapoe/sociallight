const {gql} = require('apollo-server')

module.exports = gql`
    type Diary{
        id:ID!
        body:String!
        createdAt: String!
        username:String!
    }

    type Query{
        getDiaries: [
        Diary
        ]
    }
    
    type User{
        id:ID!
        email:String!
        token:String!
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
    
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(loginInput: LoginInput): User!

    }
`