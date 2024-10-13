import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { TextField, Button, Typography, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // For error handling
  const [loggedIn, setLoggedIn] = useState(false); // To track login state
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    // Check if the user is already logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true); // User is logged in
      } else {
        setLoggedIn(false); // User is not logged in
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      // Firebase authentication using email and password
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in successfully!");
      navigate("/"); // Redirect to homepage after login
    } catch (error) {
      console.error("Error logging in:", error.message);
      setError(error.message); // Display error message
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>

      {/* If the user is already logged in, show a message instead of the login form */}
      {loggedIn ? (
        <Typography variant="body1" align="center" color="primary">
          You are already logged in!
        </Typography>
      ) : (
        <form onSubmit={handleLogin}>
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
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Container>
  );
};

export default Login;
