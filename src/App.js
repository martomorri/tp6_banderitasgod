import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [points, setPoints] = useState(0);
  const [random, setRandom] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(15);
  const [clues, setClues] = useState([]);
  const [usedClues, setUsedClues] = useState([]);
  const [ref, setRef] = useState();
  const [players, setPlayers] = useState([
    {
      name: 'Morro',
      points: 75
    },
    {
      name: 'Lauti',
      points: 143
    },
    {
      name: 'Nacho',
      points: 85
    }
  ]);

  useEffect(() => {
    axios.get("https://countriesnow.space/api/v0.1/countries/flag/images")
      .then(res => {
        console.log(res);
        setCountries(
          res.data.data.map(c => ({ name: c.name, flag: c.flag }))
        )
        setRandom(Math.floor(Math.random() * 220));
        setIsLoading(false);
      })
  }, []);

  useEffect(() => {
    if (!isLoading) {
      console.log(countries[random]);
      cleanClues(countries[random].name);
    }
  }, [random]);

  useEffect(() => {
    if (ref) clearTimeout(ref);
    setRef(
      setTimeout(() => {
        if (timer > 0) setTimer(t => t - 1);
        else {
          setRandom(Math.floor(Math.random() * 220));
          if (points > 0) setPoints(points - 1);
          setTimer(15);
        }
      }, 1000)
    );
  }, [timer])

  const renderClues = (n, uClues = []) => {
    let nClues = [];
    console.log(uClues);
    for (let i = 0; i < n.length; i++) {
      let x = 0;
      let pos = -1;
      while (pos === -1 && x < uClues.length) {
        if (i === uClues[x]) {
          pos = x;
        } else {
          x++;
        }
      }
      if (pos !== -1) nClues.push(n[i]);
      else {
        (n[i] === ' ') ? nClues.push(' ') : nClues.push('-');
      }
    }
    console.log("Estoy en renderClues()", usedClues);
    setClues(nClues);
  }

  const cleanClues = (n) => {
    setClues([]);
    setUsedClues([]);
    document.getElementById("clue").removeAttribute("disabled");
    // clueButton.removeAttribute("disabled");
    console.log("Estoy en cleanClues()", usedClues);
    renderClues(n)
  }

  const giveClue = () => {
    if (usedClues.length < 3) {
      let rClue = Math.floor(Math.random() * clues.length);
      let uClues = [...usedClues];
      let pos = -1, i = 0;
      while (pos === -1 && i < usedClues.length) {
        if (rClue === usedClues[i]) {
          rClue = Math.floor(Math.random() * clues.length);
          i = 0;
          pos = -1;
        }
        else if (countries[random].name[rClue] === ' ') {
          rClue = Math.floor(Math.random() * clues.length);
          i = 0;
        }
        else i++;
      }
      if (pos === -1) {
        uClues.push(rClue);
        if (timer > 2) setTimer(timer - 2);
        console.log("usedClues!! : ", uClues);
        console.log(rClue);
      }
      setUsedClues(uClues);
      console.log("Estoy en giveClue()", usedClues);
      renderClues(countries[random].name, uClues);
      if (uClues.length === 3) document.getElementById("clue").setAttribute("disabled", "true");
    }
    // else {
    //   document.getElementById("clue").setAttribute("disabled", "true");
    // }
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
    isLoading ? <center>
      <div class="spinner-grow" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </center> :
      <div className="App">
        <div className='points'>
          <p className='h1'>Time: {timer}</p>
          <p className='h1 '>Points: {points}</p>
        </div>
        <table class="table table-striped leaderboard table-dark">
          <thead>
            <tr>
              <th scope="col">Player</th>
              <th scope="col">Points</th>
            </tr>
          </thead>
          <tbody>
            {
              players.map(p =>
                <tr>
                  <td>{p.name}</td>
                  <td className='text-warning'>{p.points}</td>
                </tr>
              )
            }
          </tbody>
        </table>

        <img className='flag-cont' src={countries[random].flag} alt='flag' />
        <h1 className='text-white fw-bold'>{clues.join('').toString()}</h1>
        <br></br>
        <form onSubmit={e => handleSubmit(e)}>
          <button id="clue" className='btn btn-success' type='button' onClick={giveClue}>Clue</button>
          <input className='form-control w-25' type="text" name="ans" placeholder='Country name...'></input>
          <button className='btn btn-primary' type='submit'>Guess</button>
          <button className='btn btn-secondary' type='button' onClick={skipCountry}>Skip →</button>
        </form>

        <button type="button" class="btn btn-danger mt-5 btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal">
          New player
        </button>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                ...
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>

      </div>
  );
}

export default App;
