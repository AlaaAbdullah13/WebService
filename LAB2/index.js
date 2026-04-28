const { ApolloServer, gql } = require('apollo-server');
const { resolvers } = require('./resolver');

//  Defining the types
const typeDefs = gql`
  type User {
    fullname: String
    email: String
    dob: String
  }

  type Comment {
    title: String
    content: String
  }

  type Article {
    id: ID!
    title: String
    content: String
    author: User       
    comments: [Comment]
  }

  #  Queries
  type Query {
    articles: [Article]          
    article(id: ID!): Article     
  }

  #  Mutations
  type Mutation {
    createArticle(title: String, content: String): Article
  }
`;

// Then use it in your server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});