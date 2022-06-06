import "./login.scss";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
        // ...
      })
      .catch((error) => {
        setError(true);
        // ..
      });
  };
  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <TextField
          className="input"
          type="email"
          label="Email"
          variant="outlined"
          size="small"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className="input"
          type="password"
          label="Password"
          variant="outlined"
          size="small"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="success">
          Login
        </Button>
        {error && <span>Wrong Email or Password!</span>}
      </form>
    </div>
  );
};

export default Login;
