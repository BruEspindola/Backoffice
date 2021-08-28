import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Swal from 'sweetalert2';

import Footer from '../../../components/footerAdmin';
import api from '../../../services/api';
import { login, setIdUser, setNameUser } from '../../../services/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/1200x800/?wine)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [ showPassword, setShowPassword ] = useState(false);
  const [ loading, setLoading ] = useState(false)

  async function handleSubmit() {
    

    const data = {
      email,
      password
    }
    await api.post('/api/user/login', data)
      .then(res => {
        if (res.status === 200) {
          if (res.data.status === 1) {
            login(res.data.token);
            setIdUser(res.data.idUser);
            setNameUser(res.data.userName);

            window.location.href = '/admin';
          } else if (res.data.status === 2) {
            Swal.fire(
              'Opss!',
              'E-mail ou senha estão incorretos.',
              'warning'
            )
          }
          setLoading(false)
        } else {
          Swal.fire(
            'Erro!',
            'Erro no servidor.',
            'erro'
          )
          setLoading(false)
        }
      })
  };

  function loadSubmit(){
    setLoading(true);
    setTimeout(
      () => handleSubmit(),
      2000
    )
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <FormControl variant="outlined" style={{width: '100%', marginTop:10}}>
            <InputLabel htmlFor="password">Senha *</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={e => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={50}
            />
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={loadSubmit}
            disabled={loading}
          >
           {loading? <CircularProgress color="secondary" /> : 'Entrar'} 
          </Button>
          <Box mt={5}>
            <Footer />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}