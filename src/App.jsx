import { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import Meme from './components/Meme'
import Form from './components/Form'
import Gallery from './components/Gallery'
import './App.css'

function App() {
  const childRef = useRef();

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

  function printText(event) {
    const { name, value } = event.target;
    setMeme(function (prevMeme) {
      return {
        ...prevMeme,
        [name]: value
      };
    });
  }

  function snapshot() {
    childRef.current.takeScreenshot()
  }


  function selectMeme(url) {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    setMeme(function (oldValue) {
      return {
        topText : '',
        bottomText: '',
        url: url
      };
    });
  }

  return (
    <div className="App">
      <Header />

      <div id="memeWrapper" className="container mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-md-4"><Meme meme={meme} ref={childRef} /></div>
          <div className="col-md-4"><Form meme={meme} printText={printText} generateMeme={generateMeme} snapshot={snapshot} /></div>
        </div>
      </div>


      <Gallery memes={allMemes} selectMeme={selectMeme} />

    </div>
  )
}

export default App
