const express = require('express');  
const app = express(); 
const bodyParser = require('body-parser')
const path = require('path');
require('dotenv').config();

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));



app.set('view engine', 'ejs');
app.set('views','./views')




app.get('/',(req,res)=>{
  res.render('ind')
})


app.post('/weather',async(req,res) => {
  
    try {
        
        const city = req.body.city
        
        const api = process.env.API_key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`
        const weatherApiBaseUrl = process.env.WEATHER_API_BASE_URL;
        const apiKey = process.env.WEATHER_API_KEY;
        const weatherApiUrl = `${weatherApiBaseUrl}?q=${city}&appid=${apiKey}`;

        
        const response = await fetch(weatherApiUrl);
        const data = await response.json();
        

        
        const pic = '/img/sun.png'
        const pindrop = '/img/location.png'
        const up = '/img/up-arrows.png'
        const down = '/img/down-arrow.png'
        const hum = '/img/water-waves.png'
        const wind = '/img/wind.png'
        
        
        const night = '/night/night.png'
        const nightlo = '/night/nightloc.png'
        const downarr = '/night/downarrni.png'
        const uparr = '/night/uparrday.png'
        const nighthumi = '/night/nighthumi.png'
        const niwaves = '/night/nightwaves.png'
        
        
        const location = data.name
        
        const temparature = Math.round(data.main.temp*0.1)
        const desp = data.weather[0].description
        const mintemp = Math.round(data.main.temp_min*0.1)
        const maxtemp = Math.round(data.main.temp_max*0.1)
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;


        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        const sunriseTime = data.sys.sunrise; // Sunrise time in seconds
        const sunsetTime = data.sys.sunset; // Sunset time in seconds
        
        const isDay = currentTime >= sunriseTime && currentTime <= sunsetTime;
        
        
      
        res.render('weather',{
          temper:temparature,
          pics:pic,
          loc:location,
          pin:pindrop,
          description:desp,
          maxtem:maxtemp,
          mintem:mintemp,
          upword:up,
          downword:down,
          humidity:hum,
          winds:wind,
          humival:humidity,
          windval:windSpeed,
          dayy:isDay,
          nights:night,
          nightlocation:nightlo,
          uparrrr: uparr,
          downarrr:downarr,
          humidnight:nighthumi,
          wavesni:niwaves



        })
         
    } 
    catch (error) {

        res.render('err')

    }
  
})




const port = process.env.PORT

app.listen(port,() => {

  console.log(`app is running at port ${port}`);

})