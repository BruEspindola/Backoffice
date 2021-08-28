import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router';

import MenuAdmin from '../../../components/menuAdmin';
import Footer from '../../../components/footerAdmin';

import api from '../../../services/api';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: 15,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function RegisterUser() {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const { idUser } = useParams();

  useEffect(() => {
    async function getUser(){
      var response = await api.get('/api/user.details/'+idUser);
      
      setName(response.data.name);
      setEmail(response.data.email);
      setPassword(response.data.password)
    }
    getUser();
  }, [idUser])

  async function handleSubmit(){

    const data = {
      name,
      email,
      password,
      _id: idUser}

      if(name!==''&&email!==''&&password!==''){
        const response = await api.put('/api/user',data);

        if(response.status===200){
          window.location.href='/admin/user'
        }else{
          alert('Erro ao editar o usuário!');
        }
      }else{
        alert('Por favor, preencha todos os dados!');
      }
  }

  return (
    <div className={classes.root}>

      <MenuAdmin title={'Usuários'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Atualização de usuários</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="name"
                      name="name"
                      label="Nome completo"
                      fullWidth
                      autoComplete="name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      autoComplete="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="password"
                      required
                      id="password"
                      name="password"
                      label="Senha"
                      fullWidth
                      autoComplete="senha"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.btnSuccess}>
                        Salvar
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}
