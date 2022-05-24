import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { WordsWithLength } from './components/WordsWithLength';
import {FaBomb, FaCopy} from 'react-icons/fa';

function App() {

  const [substring, setSubstring] = useState('');
  const [length, setLength] = useState(0);
  const [result,setResult] = useState([]);
  
  const getInput = (ev) => {
    const word = ev.target.value;
    setSubstring(word);
    setLength(word.length);
  }

  
  useEffect(() => {
    const fetchWords = async(word,len) => {
      if(length === 0) return;
      const res = await axios.get(`https://japi.rest/bombparty/v1/search?limit=1000&sort=lenlow&q=${word}`);
      const data = res.data.words;
      for(let vlen = len ; vlen < 10 ; vlen ++){
        const dataOfVarLen = data.filter((word) => word.length === vlen);
        if(dataOfVarLen.length > 0)
          setResult((prev) => {
            return [...prev,{length: vlen, data: dataOfVarLen}]
          });
      }
    }
    setResult([]);
    fetchWords(substring,length);
  }, [substring,length])
  
  return (
    <>
      <div className='header-wrapper'>
      <h1 className='heading'><FaBomb className='bomb'/> party pooper</h1>
      <input placeholder='Enter your word Cheater...' type="text" value={substring} onChange={getInput} />
      <p>click any word to copy <FaCopy/> and cheat</p>
      </div>
      {
        result.length && length
        ? 
        result.map((str,ind)=>(
        <WordsWithLength key={ind} length={str.length} data={str.data}/>
      )) :
      <div className='banner'>
      {length ? <p>POOPSS.. No Word Found! :(</p> : <p>Enter your word to cheat...</p>}
      </div>
      }
    </>
  );
}

export default App;
