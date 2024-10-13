// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import SellBook from "./Pages/SellBook";
import Login from "./components/Login";
import Register from "./components/Register";
import './index.css'
const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sell" element={<SellBook />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
