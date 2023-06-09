import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [points, setPoints] = useState(0);
  const [random, setRandom] = useState(Math.floor(Math.random() * 220));
  const [isLoading, setIsLoading] = useState(true);
  // const [randomIndex, setRandomIndex] = useState([])
  const [timer, setTimer] = useState(15);

  useEffect(() => {
    axios.get("https://countriesnow.space/api/v0.1/countries/flag/images")
      .then(res => {
        console.log(res);
        setCountries(
          res.data.data.map(c => ({ name: c.name, flag: c.flag }))
        )
        setIsLoading(false);
      })
      // for (let index = 0; index < countries.length; index++) {
      //   setRandomIndex([...randomIndex, index]);
      // }
    }, []);

    setInterval (() => {
      if (timer > 0) setTimer(timer-1);
      else {
        setRandom(Math.floor(Math.random() * 220));
        setTimer(15);
      }
    }, 1000);

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(countries[random].name);
      if(e.target.ans.value.toLowerCase() === countries[random].name.toLowerCase()) {
        setPoints(points + 10);
        //setRandomIndex(randomIndex.filter(r => random !== r));
        setRandom(Math.floor(Math.random() * 220));
      } else {
        if (points > 0)  setPoints(points - 1);
      }
      e.target.ans.value = "";
    }

    const skipCountry = () => {
      if (points > 0)  setPoints(points - 1);
      //setRandomIndex(randomIndex.filter(r => random !== r));
      setTimer(15);
      setRandom(Math.floor(Math.random() * 220));
    }

  return (
    isLoading ? <center><p>loading...</p></center> :
    <div className="App">
      <div className='points'>
        <p className='h1'>Time: {timer}</p>
        <p className='h1'>Points: {points}</p>
      </div>
      <img className='flag-cont' src={countries[random].flag} alt='flag'/>
      <br></br>
      <form onSubmit={e => handleSubmit(e)}>
        <input className='form-control w-25' type="text" name="ans" placeholder='Country name...'></input>
        <button className='btn btn-primary' type='submit'>Guess</button>
        <button className='btn btn-secondary' onClick={skipCountry}>Skip →</button>
      </form>
    </div>
  );
}

export default App;
