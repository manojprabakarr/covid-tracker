import React,{useEffect,useState} from 'react'
import {Form, FormControl,MenuItem,Select,Card,CardContent} from '@material-ui/core'
import './app.css';
import Inforow from './components/inforow'
import Map from './components/Map'
import TableData from './components/Tabledata'
import "leaflet/dist/leaflet.css";



function App() {
  const [countryinfo,setcountryinfo]=useState({})
  const [countries,setcountries]=useState([])
  const [country,setcountry]=useState("worldwide")
  const [casesType, setCasesType] = useState("cases");
  const [Tabledata,settabledata]=useState([])
 

  useEffect(()=> {

  fetch("https://disease.sh/v3/covid-19/all")
  .then((res)=>res.json())
  .then((data)=> {
    console.log(data);
    setcountryinfo(data)
  })

  },[])

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));  
         
          settabledata(data);
          setcountries(countries);
          
        });
    };

    getCountriesData();
  }, []);

  const onCountrychange = async (event)=> {
    const countrycode=event.target.value;
    console.log(countrycode);
    
  const url =
  countrycode === "worldwide"
    ? "https://disease.sh/v3/covid-19/all"
    : `https://disease.sh/v3/covid-19/countries/${countrycode}`;
await fetch(url)
  .then((response) => response.json())
  .then((data) => {
    setcountry(countrycode);
    setcountryinfo(data);
  
  })
}





  return (
    <div className="app">
      <div className="app_left">
          <div className="app_header">
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="app_dropdown">
        <Select variant="outlined"value={country} onChange={onCountrychange}>
        <MenuItem value="Worldwide">worldwide</MenuItem>
        {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
        
        

        </Select>

      </FormControl>
      </div>
      <div className="app_stats">
      <Inforow
        title="cornovirus"
          
           
            total={countryinfo.cases}
            cases={countryinfo.cases}
           
        
           
          />
            <Inforow
            
          
          title="Recovered"
          total={countryinfo.recovered}
          cases={countryinfo.todayRecovered}
         
      
         
        />
          <Inforow
           
          
          
          title="Deaths"
          total={countryinfo.deaths}
          cases={countryinfo.todayDeaths}
         
      
         
        />
        
        

      </div>
      <Map/>
      
    


     
    </div>
    <Card className="app_right">
        <CardContent>
          <div className="app_information">
            <h3>Live Cases by Country</h3>
            <TableData  countries={Tabledata}/>
           
            <h3>Worldwide new  </h3>
           
           
          </div>
        </CardContent>
      </Card>
    </div>

  );
}

export default App;
