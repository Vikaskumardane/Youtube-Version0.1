import axios from "axios";


const BASE_URL="https://youtube138.p.rapidapi.com";  //this is the ase url for api

const options = {
    //  method: 'GET',
    // url: 'https://youtube138.p.rapidapi.com/auto-complete/',
    params: {
      
      hl: 'en',
      gl: 'US'
    },
    headers: {
      'X-RapidAPI-Key':'553301f146msh2abbece6b4058b2p1582a4jsn945d29df7a5d', 
      // process.env.REACT_APP_YOUTUBE_API_KEY,  //youing the .env to get the api key
      'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
  };
  
//wrieting the axios  method
export const fetchDataFromApi= async (url) =>{
    //de structerinng the data
    const {data} = await axios.get(`${BASE_URL}/${url}`,options);
    return data;
}

