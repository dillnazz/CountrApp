import React, {useEffect, useState} from 'react'
import {Card, Box, TextField, Grid} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
const url='https://restcountries.com/v2'


let enpoints={
  all:'/all',
  name:'/name/'
}


const App = () => {
  const [city, setCity]=useState(null)
  const [newCity, setNewCity]=useState('')
 
  const fetchCountry=async(cityName='Germany')=>{
    const res=await fetch(url+`${enpoints.name}`+cityName)
    const data=await res.json()
    console.log(data);
    setCity(data)
  }
  useEffect(()=>{
    fetchCountry()
  },[])

  if(city === null){
    return <h2> Loading...</h2>
  } 
  if (city?.status == 404) {
    console.log('error catch')
    return <h1>{city?.message} 404</h1>
    
  }
  return (
    <Grid>
    <div style={{
      alignItems:"center"
    }}>
    <Card container spacing={2} minHeight={160}  sx={{ width: 545 }}>
      <CardActionArea>
        <CardMedia 
          component="img"
          height="240"
          image={city[0].flags.png}
          alt="green iguana"
        />
        <Box>
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            Name:{city[0].name}({city[0].altSpellings[2]})
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
          population:{city[0].population}
          </Typography>
          <TextField
          value={newCity}
          onChange={(e)=>setNewCity(e.target.value)}
           size='small'/>
          <button
          onClick={()=>fetchCountry(newCity)}
          variant=''>Search</button>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
    </Grid>
  )
}

export default App