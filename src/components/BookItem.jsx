// src/components/BookItem.jsx
import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";

const BookItem = ({ book }) => {
  return (
    <Card>
      {book.imageUrl && (
        <CardMedia
          component="img"
          alt={book.title}
          height="140"
          image={book.imageUrl} // Displaying the book's image
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {book.author}
        </Typography>
        <Typography variant="body1" color="text.primary">
          Price: ${book.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookItem;
