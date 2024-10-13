// src/components/Register.jsx
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { TextField, Button, Typography, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();
  const auth = getAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      // Create a new user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered successfully!");

      // Listen for the authentication state to confirm the user is logged in
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("User is logged in:", user.email);
          navigate("/"); // Redirect to homepage after registration
        }
      });
    } catch (error) {
      setError(error.message); // Set error message to display
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleRegister}>
        <Grid container spacing={3}>
          {/* Display error message if exists */}
          {error && (
            <Grid item xs={12}>
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            </Grid>
          )}
          {/* Email Input */}
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          {/* Password Input */}
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Grid>
          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading} // Disable button while loading
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Register;
