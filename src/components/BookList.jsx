import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Config/Firebase"; // Firestore configuration
import BookItem from "./BookItem";
import { Grid, CircularProgress, Typography } from "@mui/material";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));
        const booksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Failed to load books. Please try again later."); // Set error message
      } finally {
        setLoading(false); // Move setLoading to finally block
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <Grid container justifyContent="center" style={{ padding: "20px" }}>
        <CircularProgress />
        <Typography variant="h6" style={{ marginTop: "20px" }}>
          Loading books...
        </Typography>
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container justifyContent="center" style={{ padding: "20px" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3} style={{ padding: "20px" }}>
      {books.map((book) => (
        <Grid item xs={12} sm={6} md={4} key={book.id}>
          <BookItem book={book} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BookList;
