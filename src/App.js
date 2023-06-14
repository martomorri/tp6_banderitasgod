import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [points, setPoints] = useState(0);
  const [random, setRandom] = useState(Math.floor(Math.random() * 220));
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(15);
  const [clues, setClues] = useState('');
  const [ref, setRef] = useState();

  useEffect(() => {
    axios.get("https://countriesnow.space/api/v0.1/countries/flag/images")
      .then(res => {
        console.log(res);
        setCountries(
          res.data.data.map(c => ({ name: c.name, flag: c.flag }))
        )
        setIsLoading(false);
      })
  }, []);

  useEffect(() => {
    if(ref) clearTimeout(ref);
    setRef(
      setTimeout(() => {
        if (timer > 0) setTimer(t => t-1);
        else {
          setRandom(Math.floor(Math.random() * 220));
          cleanClues(countries[random].name);
          setTimer(15);
        }
      }, 1000)
    );
  }, [timer])

  const cleanClues = (n) => {
    console.log(n.length);
    setClues('');
    let nc = '';
    for (let i = 0; i <= n.length; i++) {
      console.log(i);
      nc += '_ ';
    }
    setClues(nc);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(countries[random].name);
    if (e.target.ans.value.toLowerCase() === countries[random].name.toLowerCase()) {
      setPoints(points + 10);
      setRandom(Math.floor(Math.random() * 220));
      cleanClues(countries[random].name);
      setTimer(15);
    } else {
      if (points > 0) setPoints(points - 1);
    }
    e.target.ans.value = "";
  }

  const skipCountry = () => {
    if (points > 0) setPoints(points - 1);
    setTimer(15);
    setRandom(Math.floor(Math.random() * 220));
    cleanClues(countries[random].name);
  }

  return (
    isLoading ? <center><p>loading...</p></center> :
      <div className="App">
        <div className='points'>
          <p className='h1'>Time: {timer}</p>
          <p className='h1'>Points: {points}</p>
        </div>
        <img className='flag-cont' src={countries[random].flag} alt='flag' />
        <p className='fw-bold text-white'>{clues}</p>
        <br></br>
        <form onSubmit={e => handleSubmit(e)}>
          <input className='form-control w-25' type="text" name="ans" placeholder='Country name...'></input>
          <button className='btn btn-primary' type='submit'>Guess</button>
          <button className='btn btn-secondary' type='button' onClick={skipCountry}>Skip →</button>
        </form>
      </div>
  );
}

export default App;
