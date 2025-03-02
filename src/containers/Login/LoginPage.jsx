import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { login } from "../Login/loginSlicer";
import { TextField, Button, Container, Typography, Box, } from '@mui/material';
import { toast } from "react-toastify";
import { ApiCalls } from "../../Services/ApiCalls";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userName, password, onInputChange } = useForm({ userName: '', password: '' });

  const handleLogin = () => {

    if (!userName || !password) return toast.warning('Please enter a valid username');
    const lastPath = localStorage.getItem('lastPath') || '/';

    ApiCalls.GetTokenAuthentication('user/login', { userName, password }).then(
      response => {

        if (!response.usuarioAutenticado) {
          return;
        }
        sessionStorage.access_token = response.token;
        const requestUserInfo = {
          usuarioId: userName,
        }
        sessionStorage.usuarioId = userName;
        sessionStorage.requestUserInfo = JSON.stringify(requestUserInfo);
        dispatch(login(userName));
        navigate(lastPath, { replace: true });
      }
    );
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, textAlign: 'center' }}>
        <Typography variant="h4">Login</Typography>
        <TextField
          margin="normal"
          fullWidth
          label="User"
          value={userName}
          name="userName"
          onChange={onInputChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="password"
          type="password"
          value={password}
          name="password"
          onChange={onInputChange}

        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          sx={{ mt: 3 }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};
