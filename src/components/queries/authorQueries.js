import { gql } from "@apollo/client";

export const GET_AUTHORS = gql`
  {
    authors {
      name
      id
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;
