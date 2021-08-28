import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Swal from 'sweetalert2';
import api from '../services/api';
import { getToken, logout } from '../services/auth';

export const mainListItems = (
  <div>
    <ListItem button component="a" href="/admin">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component="a" href="/admin/products">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Produtos" />
    </ListItem>
    <ListItem button component="a" href="/admin/user">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Usuarios" />
    </ListItem>  
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Config</ListSubheader>
    <ListItem button onClick={confirmExit}>
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItem>
  </div>
);

async function confirmExit(){

  Swal.fire({
    title: 'Deseja sair do sistema?',
    icon: 'warning',
    confirmButtonText:'Sim, sair',
    confirmButtonColor: '#3085d6',
    showCancelButton: true,
    cancelButtonColor: '#d33'
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await api.get("/api/user/destroytoken", {headers:{token: getToken()}});
      if(res.status ===200){
        logout();
        window.location.href='/'
      }else{
        Swal.fire(
          'Ooops!',
          'Não foi possivel sair',
          'error'
        )
      }     
    }
  })
}
