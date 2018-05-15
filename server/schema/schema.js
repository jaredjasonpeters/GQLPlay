const graphql = require('graphql');

const {GraphQLObjectType,
       GraphQLString, 
       GraphQLSchema,
       GraphQLID,
       GraphQLList,
       GraphQLInt} = graphql;


//dummy data

const books = [
  {name: 'Name of the Wild', genre: 'Horror', id: '1', authorId: '2'},
  {name: 'Call of the Wild', genre: 'Horror', id: '2', authorId: '1'},
  {name: 'Triumph of the Wild', genre: 'Horror', id: '3', authorId: '3'},
  {name: 'Hopscotch', genre: 'Horror', id: '4', authorId: '3'},
  {name: 'FourSquare', genre: 'Horror', id: '5', authorId: '1'},
  {name: 'SkipBo', genre: 'Horror', id: '6', authorId: '3'},
];

const authors = [
  {name: 'Patrick Rothfuss', age: 44, id: '1'},
  {name: 'Tom Jones', age: 24, id: '2'},
  {name: 'Link Light', age: 34, id: '3'},
]

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: { 
      type: GraphQLList(BookType),
      resolve(parent, args) {
        const matchedBooks = [];
        for (book of books) {
         if (book.authorId === parent.id) matchedBooks.push(book);
        }
        return matchedBooks;
      }
    }
  })
})

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: { 
      type: AuthorType,
      resolve(parent, args) {
        for (author of authors) {
          if(author.id === parent.authorId) return author;
        }
      }
    }
  })
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db/ other source
         for (const book of books) {
           if (book.id === args.id) return book;
        }
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        for (const author of authors) {
          if (author.id === args.id) return author;
        }
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        return authors
      }
    }
   }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})