import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [points, setPoints] = useState(0);
  const [random, setRandom] = useState(Math.floor(Math.random() * 221));

  useEffect(() => {
    axios.get("https://countriesnow.space/api/v0.1/countries/flag/images")
      .then(res => {
        console.log(res);
        setCountries(
          res.data.data.map(c => ({ name: c.name, flag: c.flag }))
        )  
      })
    }, []);


  // console.log(countries);

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
