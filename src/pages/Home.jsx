import React , {useState} from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config';
// ,{ useState }

const Home = () => {
  const [input, setInput]=useState('');
  const [results,setResults]=useState(null);
  const onInputChange = ev => {
    setInput(ev.target.value);
  };

const renderResults=()=>{
  if (results && results.length ===0)
  {
     return (<div>No results</div>)
  }
  if (results&&results.length>0)
  {
    return (<div>{results.map((item) => <div key={item.show.id}>{item.show.name}</div> )}</div>)
  }
  return null;
}

  const onSearch = () => {
    apiGet(`/search/shows?q=${input}`).then(result=>{setResults(result);})
    
    // https://api.tvmaze.com/search/shows?q=men
    // fetch(`https://api.tvmaze.com/search/shows?q=${input}`).then(r=>r.json()).then(result=>{setResults(result);console.log(result);})
    // console.log(input);
  };

  const onKeyDown = (ev)=> {
    // if the key pressed was Enter button //get keycodes from https://www.toptal.com/developers/keycode
    if (ev.keyCode === 13) 
    {
      onSearch()
    }
  }

  return (
    <MainPageLayout>
      <input type="text" onChange={onInputChange} onKeyDown={onKeyDown}/>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}  

    </MainPageLayout>
  );
};

export default Home;
