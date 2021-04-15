import React,{useEffect,useState} from 'react'
import { FormControl,MenuItem,Select,Card,CardContent} from '@material-ui/core'
import './app.css';
import Inforow from './components/inforow'
import Map from './components/Map'
import TableData from './components/Tabledata'
import "leaflet/dist/leaflet.css";
import { sortData, statPrettier } from './components/util'



function App() {
  const [countryInfo,setcountryInfo]=useState({})
  const [countries,setcountries]=useState([])
  const [country,setcountry]=useState("worldwide")
  const [casesType, setCasesType] = useState("cases");
  const [Tabledata,settabledata]=useState([])
  const [mapcountries, setmapcountries] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
 

  useEffect(()=> {

  fetch("https://disease.sh/v3/covid-19/all")
  .then((res)=>res.json())
  .then((data)=> {
  
    setcountryInfo(data)
  })

  },[])

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));  
         let Sorteddata=sortData(data)
         
          setcountries(countries);
          settabledata(Sorteddata);
          setmapcountries(Sorteddata)
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
    setcountryInfo(data);
    setMapCenter({ lat: data.countryInfo.lat, lng: data.countryInfo.long });
        setMapZoom(4);
  
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
         active={casesType === "cases"}
         isRed
         onClick={(e) => setCasesType("cases")}
            total={statPrettier(countryInfo.cases)}
            cases={statPrettier(countryInfo.cases)}
           
        
           
          />
            <Inforow
              active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
          title="Recovered"
          total={statPrettier(countryInfo.recovered)}
          cases={statPrettier(countryInfo.todayRecovered)}
         
      
         
        />
          <Inforow
           
          
           active={casesType === "deaths"}
           onClick={(e) => setCasesType("deaths")}
          title="Deaths"
          total={statPrettier(countryInfo.deaths)}
          cases={statPrettier(countryInfo.todayDeaths)}
         
      
         
        />
        
        

      </div>
      <Map
       countries={mapcountries}
       casesType={casesType}
        center={mapCenter}
        zoom={mapZoom}
      />
      
    


     
    </div>
    <Card className="app_right">
        <CardContent>
          <div className="app_information">
            <h3>Live Cases by Country</h3>
            <TableData  countries={Tabledata}/>
           
        
           
           
          </div>
        </CardContent>
      </Card>
    </div>

  );
}

export default App;
