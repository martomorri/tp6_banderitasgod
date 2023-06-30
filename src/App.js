import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Form from "./components/Form/Form";
import Counter from "./components/Counter/Counter";
import Flag from "./components/Flag/Flag";

function App() {
  const [countries, setCountries] = useState([]);
  const [points, setPoints] = useState(0);
  const [random, setRandom] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(15);
  const [clues, setClues] = useState([]);
  const [usedClues, setUsedClues] = useState([]);
  const [ref, setRef] = useState();

  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/flag/images")
      .then((res) => {
        console.log(res);
        setCountries(
          res.data.data.map((c) => ({ name: c.name, flag: c.flag }))
        );
        setRandom(Math.floor(Math.random() * 220));
        setIsLoading(false);
      });
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
        if (timer > 0) setTimer((t) => t - 1);
        else {
          setRandom(Math.floor(Math.random() * 220));
          if (points > 0) setPoints(points - 1);
          setTimer(15);
        }
      }, 1000)
    );
  }, [timer]);

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
        n[i] === " " ? nClues.push(" ") : nClues.push("-");
      }
    }
    console.log("Estoy en renderClues()", usedClues);
    setClues(nClues);
  };

  const cleanClues = (n) => {
    setClues([]);
    setUsedClues([]);
    document.getElementById("clue").removeAttribute("disabled");
    console.log("Estoy en cleanClues()", usedClues);
    renderClues(n);
  };

  const giveClue = () => {
    if (usedClues.length < 3) {
      let rClue = Math.floor(Math.random() * clues.length);
      let uClues = [...usedClues];
      let pos = -1,
        i = 0;
      while (pos === -1 && i < usedClues.length) {
        if (rClue === usedClues[i]) {
          rClue = Math.floor(Math.random() * clues.length);
          i = 0;
          pos = -1;
        } else if (countries[random].name[rClue] === " ") {
          rClue = Math.floor(Math.random() * clues.length);
          i = 0;
        } else i++;
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
      if (uClues.length === 3)
        document.getElementById("clue").setAttribute("disabled", "true");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(countries[random].name);
    if (
      e.target.ans.value.toLowerCase() === countries[random].name.toLowerCase()
    ) {
      setPoints(points + 10);
      setRandom(Math.floor(Math.random() * 220));
      cleanClues(countries[random].name);
      setTimer(15);
    } else {
      if (points > 0) setPoints(points - 1);
    }
    e.target.ans.value = "";
  };

  const skipCountry = () => {
    if (points > 0) setPoints(points - 1);
    setTimer(15);
    setRandom(Math.floor(Math.random() * 220));
    cleanClues(countries[random].name);
  };

  return isLoading ? (
    <center>
      <div class="spinner-grow" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </center>
  ) : (
    <div className="App">
      <Counter timer={timer} points={points} />
      <Flag flag={countries[random].flag} clues={clues.join("").toString()} />
      <Form
        handleSubmit={handleSubmit}
        giveClue={giveClue}
        skipCountry={skipCountry}
      />
    </div>
  );
}

export default App;
