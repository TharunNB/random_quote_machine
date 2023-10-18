import React from 'react';
import { useState, useEffect } from 'react';
import "./App.scss";
import COLORS_ARRAY from './colorsArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

let quoteurl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";


function App() {
    const [quote,setQuote] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae augue ac est vulputate pulvinar tincidunt et nisi.");
    const [author,setAuthor] = useState("Lorem Ipsum");
    const [quotesArray, setQuotesArray] = useState(null)
    const [bgColor, setbgColor] = useState('#33991A')

    const fetchQuote = async(quoteurl) =>{
      const response = await fetch(quoteurl)
      const parsedJSON = await response.json()
      setQuotesArray(parsedJSON.quotes)
    }

    useEffect(() => {
      fetchQuote(quoteurl);
    }, [])
    

    const changeOnClick = () => {
      let randnum = Math.floor(Math.random()*quotesArray.length);
      setQuote(quotesArray.at(randnum).quote);
      setAuthor(quotesArray.at(randnum).author);
      setbgColor(COLORS_ARRAY.at(Math.floor(Math.random()*COLORS_ARRAY.length)));
    }

    return (
      <div className='App'>
        <header className='App-header' style={{backgroundColor:bgColor}}>
          <div id="quote-box" style={{color:bgColor}}>
          <p id="text">{quote}</p>
          <p id="author">- {author}</p>
          <div className='button'>
          <a id="tweet-quote" style={{backgroundColor:bgColor}} href='twitter.com/intent/tweet' target="_top">
            <FontAwesomeIcon icon={faTwitter}/>
          </a>
          </div>
          <button onClick={changeOnClick} style={{backgroundColor:bgColor}} id="new-quote">New Quote</button>
          </div>
        </header>
      </div>
    )
}

export default App;
