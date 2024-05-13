import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { ADD_BOOK, GET_AUTHORS } from "./queries/authorQueries";
import { GET_BOOKS } from "./queries/bookQueries";

const AddBook = () => {
  const { data, loading, error } = useQuery(GET_AUTHORS);
  const [addBook, { data: bData, loading: bLoading, error: bError }] =
    useMutation(ADD_BOOK, { refetchQueries: [GET_BOOKS] });
  const [book, setBook] = useState({
    name: "",
    genre: "",
    authorId: "",
  });
  const renderAuthors = () => {
    if (loading) {
      return <option>Loading authors...</option>;
    } else {
      return data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((book) => ({
      ...book,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({
      variables: {
        name: book.name,
        genre: book.genre,
        authorId: book.authorId,
      },
    });
    setBook({ name: "", genre: "", authorId: "" });
  };
  return (
    <form className="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Name: </label>
        <input
          type="text"
          onChange={handleChange}
          name="name"
          value={book.name}
        />
      </div>
      <div className="field">
        <label>Genre: </label>
        <input
          type="text"
          onChange={handleChange}
          name="genre"
          value={book.genre}
        />
      </div>
      <div className="field">
        <label>Author: </label>
        <select onChange={handleChange} name="authorId" value={book.authorId}>
          <option>Select Author</option>
          {renderAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
