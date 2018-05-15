const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');

const {GraphQLObjectType,
       GraphQLString, 
       GraphQLSchema,
       GraphQLID,
       GraphQLList,
       GraphQLInt} = graphql;


const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: { 
      type: GraphQLList(BookType),
      resolve(parent, args) {
        // const matchedBooks = [];
        // for (book of books) {
        //  if (book.authorId === parent.id) matchedBooks.push(book);
        // }
        // return matchedBooks;
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
        // for (author of authors) {
        //   if(author.id === parent.authorId) return author;
        // }
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
        //  for (const book of books) {
        //    if (book.id === args.id) return book;
        // }
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        // for (const author of authors) {
        //   if (author.id === args.id) return author;
        // }
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

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        })
        return author.save()


      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});