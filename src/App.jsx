import { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import Meme from './components/Meme'
import Form from './components/Form'
import Gallery from './components/Gallery'
import { ContentfulClient, ContentfulProvider } from 'react-contentful';
import './App.css'
// const contentful = require('contentful')

function App() {
  const childRef = useRef();

  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    url: "",
  });

  const [allMemes, setAllMemes] = useState([]);
  // const [allItems, setAllItems] = useState([]);

  useEffect(function () {
    const client = new ContentfulClient({
      accessToken: 'HNp5TfB0k_lI3sohmVAMM-tUb5lzK2Nu8NfQ_DFtIfo',
      space: 'g1jda96az8cb',
      environment: 'master'
    });
    
    client.getEntries({
      content_type: "meme"
    })
    .then((response) => {
      setAllMemes(response.items)
    })
    .catch(console.error)


    // fetch("https://api.imgflip.com/get_memes")
    //   .then(res => res.json())
    //   .then(data => setAllMemes(data.data.memes));
  }, [])
  console.log(allMemes)

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
        ...oldValue,
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
