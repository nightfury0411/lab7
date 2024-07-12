import GoogleIcon from "@mui/icons-material/Google";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Container } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useOath } from "../components/customhook/useAouth";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignInSide() {
  const oath = useOath();
  const navigation = useNavigate();
  const { setUser, setLogin } = oath;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLoginFunctionWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      let gmail;
      try {
        const getInformationLink = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse?.access_token}`;
        const requestGoogle = await axios(getInformationLink);
        gmail = requestGoogle?.data?.email;
        const requestLoginFunction = await axios.get(
          `/user?email=${requestGoogle?.data?.email}`
        );
        if (
          requestLoginFunction.status === 200 &&
          requestLoginFunction.data.length
        ) {
          const response = requestLoginFunction.data[0];
          setUser(response);
          setLogin(true);
          if (response.role === "admin") {
            navigation("/admin/user-management");
            return;
          }
          alert("Login successful");
          navigation("/");
        } else {
          alert("Login failed");
        }
      } catch (err) {
        const requestRegisterFunction = await axios.post(`/user`, {
          email: gmail,
          role: "user",
        });
        if (
          requestRegisterFunction.status === 201 &&
          requestRegisterFunction.data
        ) {
          const response = requestRegisterFunction.data;
          setUser(response);
          setLogin(true);
          alert("Login successful");
          navigation("/");
        } else {
          alert("Login failed");
        }
      }
    },
    onError: () => {
      alert("Login Failed");
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const requestLoginFunction = await axios.get(
        `/user?email=${email}&&password=${password}`
      );

      if (
        requestLoginFunction.status === 200 &&
        requestLoginFunction.data.length
      ) {
        const response = requestLoginFunction.data[0];
        setUser(response);
        setLogin(true);
        if (response.role === "admin") {
          navigation("/admin/user-management");
          return;
        }
        alert("Login successful");
        navigation("/");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ backgroundColor: "#da3311" }}
              sx={{
                mb: 2,
                bgColor: "#da3311",
                display: "flex",
                alignItems: "center",
              }}
              onClick={handleLoginFunctionWithGoogle}
            >
              <GoogleIcon /> &ensp; Sign In With Google
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
