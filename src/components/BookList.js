import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import BookDetails from "./BookDetails";
import { GET_BOOKS } from "./queries/bookQueries";

const BookList = () => {
  const [selected, setSelected] = useState();
  const { data, loading, error } = useQuery(GET_BOOKS);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }
  return (
    <div id="book-list">
      <h1>Book List</h1>
      <ul>
        {data.books.map((book) => (
          <li key={book.id} onClick={() => setSelected(book.id)}>
            {book.name}
          </li>
        ))}
      </ul>
      <BookDetails bookId={selected} />
    </div>
  );
};

export default BookList;
