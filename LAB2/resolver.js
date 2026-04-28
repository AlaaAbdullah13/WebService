const articlesData = [
  { 
    id: "1", title: "GraphQL is Awesome", content: "Body text...", 
    author: { fullname: "Alaa Abdallah", email: "alaa@example.com" },
    comments: [{ title: "Great", content: "I loved it" }]
  }
];

const resolvers = {
  Query: {
    // 1. Fetch articles including comments and author 
    articles: () => articlesData,
    
    // 2. Fetch article by its id 
    article: (_, { id }) => articlesData.find(article => article.id === id)
  },
  
  Mutation: {
    // Mutation to create Article 
    createArticle: (_, { title, content }) => {
      const newArticle = { id: String(articlesData.length + 1), title, content };
      articlesData.push(newArticle);
      return newArticle;
    }
  }
};

module.exports = { resolvers };
