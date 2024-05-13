import { useQuery } from "@apollo/client";
import React from "react";
import { GET_BOOK } from "./queries/bookQueries";

const BookDetails = ({ bookId }) => {
  const { data, loading, error } = useQuery(GET_BOOK, {
    variables: { id: bookId },
  });
  const displayDetails = () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error && bookId) {
      return <div>{JSON.stringify(error)}</div>;
    }
    if (data) {
      return (
        <div>
          <h2>{data.book.name}</h2>
          <p>Genre: {data.book.genre}</p>
          <p>Author: {data.book.author.name}</p>
          <h3>Books by the same author</h3>
          <ul>
            {data.book.author.books.map((book) => (
              <li key={book.id}>{book.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected...</div>;
    }
  };
  return <div id="book-details">{displayDetails()}</div>;
};

export default BookDetails;
