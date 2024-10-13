// src/pages/SellBook.jsx
import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography, Container, Card, CardContent, CardActions } from "@mui/material";
import { addDoc, collection, query, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../Config/Firebase"; // Firestore and Storage configuration
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const SellBook = () => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    price: "",
    imageUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]); // To store all books added by the user
  const [isEditing, setIsEditing] = useState(false); // To toggle between edit and add
  const [editBookId, setEditBookId] = useState(null); // ID of the book being edited

  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchBooks(); // Fetch all books when user is authenticated
      } else {
        navigate("/login"); // Redirect to login if not logged in
      }
    });
  }, [navigate]);

  // Fetch all books
  const fetchBooks = async () => {
    const booksCollection = collection(db, "books");
    const querySnapshot = await getDocs(booksCollection);
    const booksData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setBooks(booksData);
  };

  const handleChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile && !isEditing) {
      alert("Please upload an image.");
      return;
    }

    if (user) {
      if (isEditing) {
        // Update existing book
        await updateBook(editBookId);
      } else {
        // Add new book
        await uploadAndAddBook();
      }
    }
  };

  const uploadAndAddBook = async () => {
    const imageRef = ref(storage, `book-images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(imageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Error uploading image:", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        try {
          await addDoc(collection(db, "books"), {
            ...bookData,
            imageUrl: downloadURL,
            // Remove userId to allow listing books without user restriction
          });
          alert("Book listed successfully!");
          setBookData({ title: "", author: "", price: "", imageUrl: "" });
          setImageFile(null);
          setUploadProgress(0);
          fetchBooks(); // Refresh the books list
        } catch (error) {
          console.error("Error adding book:", error);
        }
      }
    );
  };

  const updateBook = async (id) => {
    try {
      await updateDoc(doc(db, "books", id), bookData);
      alert("Book updated successfully!");
      setIsEditing(false);
      setBookData({ title: "", author: "", price: "", imageUrl: "" });
      setEditBookId(null);
      fetchBooks();
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleEdit = (book) => {
    setIsEditing(true);
    setEditBookId(book.id);
    setBookData({
      title: book.title,
      author: book.author,
      price: book.price,
      imageUrl: book.imageUrl,
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "books", id));
      alert("Book deleted successfully!");
      fetchBooks(); // Refresh the books list
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        {isEditing ? "Edit Book" : "Sell Your Book"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Book Title"
              variant="outlined"
              fullWidth
              name="title"
              value={bookData.title}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Author"
              variant="outlined"
              fullWidth
              name="author"
              value={bookData.author}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              name="price"
              value={bookData.price}
              onChange={handleChange}
              type="number"
              required
            />
          </Grid>
          {!isEditing && (
            <Grid item xs={12}>
              <Button variant="contained" component="label" fullWidth>
                Upload Image
                <input type="file" hidden onChange={handleImageChange} />
              </Button>
            </Grid>
          )}
          <Grid item xs={12}>
            {uploadProgress > 0 && (
              <Typography variant="body2" color="textSecondary">
                Upload Progress: {Math.round(uploadProgress)}%
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {isEditing ? "Update Book" : "Submit Book"}
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* List of books added by the user */}
      <Typography variant="h5" align="center" gutterBottom style={{ marginTop: "20px" }}>
        All Listed Books
      </Typography>
      {books.length > 0 ? (
        books.map((book) => (
          <Card key={book.id} style={{ marginBottom: "20px" }}>
            <CardContent>
              <Typography variant="h6">{book.title}</Typography>
              <Typography variant="body2">Author: {book.author}</Typography>
              <Typography variant="body2">Price: ${book.price}</Typography>
              <img src={book.imageUrl} alt={book.title} style={{ width: "100%", maxHeight: "200px" }} />
            </CardContent>
            <CardActions>
              <Button color="primary" onClick={() => handleEdit(book)}>
                Edit
              </Button>
              <Button color="secondary" onClick={() => handleDelete(book.id)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography variant="body1" align="center">
          No books listed yet.
        </Typography>
      )}
    </Container>
  );
};

export default SellBook;
