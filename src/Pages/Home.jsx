// src/pages/Home.jsx
import BookList from "../components/BookList";

const Home = () => {
  const books = [
    { id: 1, title: "Book One", author: "Author One", price: 10 },
    { id: 2, title: "Book Two", author: "Author Two", price: 15 },
  ];

  return (
    <div>
      <h2>Available Books</h2>
      <BookList books={books} />
    </div>
  );
};

export default Home;
