import { useState, useEffect } from 'react'
import Header from './components/Header'
import Meme from './components/Meme'
import './App.css'

function App() {

  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    url: "",
  });

  const [allMemes, setAllMemes] = useState([]);

  useEffect(function () {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllMemes(data.data.memes));
  }, [])

  useEffect(function () {
    if (allMemes.length === 0) return;
    generateMeme()
  }, [allMemes])

  function generateMeme() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    setMeme(function (oldValue) {
      return {
        topText: '',
        bottomText: '',
        ...allMemes[randomNumber],
      };
    });
  }

  return (
    <div className="App">
      <Header />

      <div id="memeWrapper" className="container mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-md-4"><Meme meme={meme} /></div>
        </div>
      </div>

    </div>
  )
}

export default App
