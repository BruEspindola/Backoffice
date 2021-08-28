import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import MenuAdmin from '../../../components/menuAdmin';
import Footer from '../../../components/footerAdmin';
import api from '../../../services/api';

const RedCheckbox = withStyles({
  root: {
    color: red[400],
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

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
  formControl: {
    width: '100%'
  },
  text:{
    alignSelf:'center',
    alignContent:'center',
    textAlign:'center',
    padding: 20
  },
  btnSuccess: {
    marginTop: 20
  }
}));

export default function RegisterProduct() {
  const classes = useStyles();

  const [nameWine, setNameWine] = useState('');
  const [harvest, setHarvest] = useState('');
  const [type, setType] = useState('');
  const [grape, setGrape] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [winery, setWinery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [describe, setDescribe] = useState('');
  const [tagsHarm, setTagsHarm] = useState([]);

  const { idProduct } = useParams();

  useEffect(() => {
    async function getProduct(){
      var response = await api.get('/api/product.details/'+idProduct);

      setNameWine(response.data.nameWine);
      setHarvest(response.data.harvest);
      setType(response.data.type);
      setGrape(response.data.grape);
      setCountry(response.data.country);
      setRegion(response.data.region);
      setWinery(response.data.winery);
      setMinPrice(response.data.minPrice);
      setMaxPrice(response.data.maxPrice);
      setDescribe(response.data.describe);
      setTagsHarm(response.data.tagsHarm);
    }
    getProduct();
  }, [idProduct])

  async function handleSubmit() {

    const priceAveg = parseFloat(minPrice + maxPrice)/2;
    const priceAvg = priceAveg.toFixed(2)
    const data = {
      nameWine,
      describe, 
      harvest, 
      type, 
      grape, 
      country, 
      region, 
      winery, 
      minPrice, 
      maxPrice, 
      priceAvg,
      tagsHarm,
      _id: idProduct
    }

    if (nameWine !== '' && harvest !== '' && type !== '' && grape !== '' && country !== '' && region !== '' && 
            winery !== '' && minPrice !== '' && maxPrice !== '') {

      const response = await api.put('/api/product', data);

      if (response.status === 200) {
        window.location.href = '/admin/products'
      } else {
        alert('Erro ao editar produto!');
      }
    } else {
      alert('Por favor, preencha todos os dados!');
    }
  }
  function handleChecked(e){

     if (e.target.checked){
       setTagsHarm([...tagsHarm, e.target.value]);
     } else {
       setTagsHarm(tagsHarm.filter(element => element !== e.target.value));
     }
  }

  return (
    <div className={classes.root}>

      <MenuAdmin title={'Produtos'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Atualização de Produtos</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="nameWine"
                      name="nameWine"
                      label="Nome Vinho"
                      fullWidth
                      autoComplete="name"
                      value={nameWine}
                      onChange={e => setNameWine(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="number"
                      required
                      id="harvest"
                      name="harvest"
                      label="Safra"
                      min="1"
                      max="9999"
                      fullWidth
                      autoComplete="harvest"
                      value={harvest}
                      onChange={e => setHarvest(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="labelTipo">Tipo</InputLabel>
                      <Select
                        labelId="labelTipo"
                        id="tipo"
                        value={type}
                        onChange={e => setType(e.target.value)}
                      >
                        <MenuItem value={'Espumante'}>Espumante</MenuItem>
                        <MenuItem value={'Vinho Branco Leve'}>Vinho Branco Leve</MenuItem>
                        <MenuItem value={'Vinho Branco Encorpado'}>Vinho Branco Encorpado</MenuItem>
                        <MenuItem value={'Vinho Branco Aromatico'}>Vinho Branco Aromatico</MenuItem>
                        <MenuItem value={'Vinho Rosé'}>Vinho Rosé</MenuItem>
                        <MenuItem value={'Vinho Tinto Leve'}>Vinho Tinto Leve</MenuItem>
                        <MenuItem value={'Vinho Tinto de Médio Corpo'}>Vinho Tinto de Médio Corpo</MenuItem>
                        <MenuItem value={'Vinho Tinto Encorpado'}>Vinho Tinto Encorpado</MenuItem>
                        <MenuItem value={'Vinho de Sobremesa'}>Vinho de Sobremesa</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      id="grape"
                      name="grape"
                      label="Uva"
                      fullWidth
                      value={grape}
                      onChange={e => setGrape(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      id="country"
                      name="country"
                      label="País"
                      fullWidth
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      id="region"
                      name="region"
                      label="Região"
                      fullWidth
                      value={region}
                      onChange={e => setRegion(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      id="winery"
                      name="winery"
                      label="Vinicola"
                      fullWidth
                      value={winery}
                      onChange={e => setWinery(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      id="minPrice"
                      name="minPrice"
                      type="number"
                      label="Preço Minimo"
                      fullWidth
                      value={minPrice}
                      onChange={e => setMinPrice(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      id="maxPrice"
                      type="number"
                      name="maxPrice"
                      label="Preço Maximo"
                      fullWidth
                      value={maxPrice}
                      onChange={e => setMaxPrice(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="describe"
                      name="describe"
                      label="Descrição"
                      fullWidth
                      value={describe}
                      onChange={e => setDescribe(e.target.value)}
                    />
                  </Grid>
                  </Grid>
                  <div className={classes.text}><h2>Harmonização</h2></div>        
                  <Grid item xs={12} sm={12}>
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Carne Vermelha" />}
                        label="Carne Vermelha"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Carne Curada" />}
                        label="Carne Curada"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Carne Branca" />}
                        label="Carne Branca"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Crustaceos" />}
                        label="Crustáceos"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Frutos do Mar" />}
                        label="Frutos do Mar"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Peixes" />}
                        label="Peixes"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Moluscos" />}
                        label="Moluscos"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Queijos Duros" />}
                        label="Queijos Duros"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Queijos Moles" />}
                        label="Queijos Moles"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Queijos frescos, salgados e ácidos" />}
                        label="Queijos frescos, salgados e ácidos"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Queijos Delicados" />}
                        label="Queijos Delicados"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Queijos Fortes e firmes" />}
                        label="Queijos Fortes e firmes"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Queijos Pungentos" />}
                        label="Queijos Pungentos"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Verduras" />}
                        label="Verduras"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Folhas e vegetais verdes" />}
                        label="Folhas e vegetais verdes"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Raízes e vegetais rasteiros" />}
                        label="Raízes e vegetais rasteiros"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Aliáceos" />}
                        label="Aliáceos"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Salanáceas" />}
                        label="Salanáceas"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Feijão" />}
                        label="Feijão"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Cogumelos" />}
                        label="Cogumelos"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Especiarias" />}
                        label="Especiarias"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Ervas frescas" />}
                        label="Ervas frescas"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Especiarias de forno" />}
                        label="Especiarias de forno"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Especiarias Exóticas" />}
                        label="Especiarias Exóticas"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Pimentas Vermelhas" />}
                        label="Pimentas Vermelhas"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Ervas Resinosas" />}
                        label="Ervas Resinosas"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Castanhas" />}
                        label="Castanhas"
                        onChange={handleChecked}
                      />
                      <FormControlLabel
                        control={<RedCheckbox name="checkedG" value="Sobremesa" />}
                        label="Sobremesa"
                        onChange={handleChecked}
                      />
                      
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.btnSuccess}>
                        Salvar
                    </Button>
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
