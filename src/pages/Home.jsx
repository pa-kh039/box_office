import React , {useState} from 'react';
import MainPageLayout from '../components/MainPageLayout';
// ,{ useState }

const Home = () => {
  const [input, setInput]=useState('');
  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onSearch = () => {
    // https://api.tvmaze.com/search/shows?q=men
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`).then(r=>r.json()).then(result=>console.log(result))
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
    </MainPageLayout>
  );
};

export default Home;
