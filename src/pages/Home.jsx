import React , {useState} from 'react';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import ActorGrid from '../components/actor/ActorGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
// ,{ useState }

const Home = () => {
  const [input, setInput]=useLastQuery('');
  const [results,setResults]=useState(null);
  const [searchOption, setsearchOption]=useState('shows');
  

  const isShowsSearch = searchOption==='shows';



  const onInputChange = ev => {
    setInput(ev.target.value);
  };

const renderResults=()=>{
  if (results && results.length ===0)
  {
     return (<div>No results</div>);
  }
  if (results&&results.length>0)
  {
    return (results[0].show ? <ShowGrid data={results}/>:<ActorGrid data={results}/>)
    // results.map(item=>(<div key={item.person.id}>{item.person.name}</div>))
    // return (<div>{results.map((item) => <div key={item.show.id}>{item.show.name}</div> )}</div>)
  }
  return null;
}

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result=>{setResults(result);})
    
    // https://api.tvmaze.com/search/shows?q=men
    // fetch(`https://api.tvmaze.com/search/shows?q=${input}`).then(r=>r.json()).then(result=>{setResults(result);console.log(result);})
    // console.log(input);
  };

  const onKeyDown = (ev)=> {
    // if the key pressed was Enter button //get keycodes from https://www.toptal.com/developers/keycode
    if (ev.keyCode === 13) 
    {
      onSearch();
    }
  }
   const onRadioChange = (ev) => {
      setsearchOption(ev.target.value);
   }

// console.log(searchOption);

  return (
    <MainPageLayout>
      <input type="text" placeholder="Search for something" onChange={onInputChange} onKeyDown={onKeyDown} value={input}/>
      <div>
        <label htmlFor='shows-search'>
          Shows
          <input id="shows-search" type="radio" value="shows" onChange={onRadioChange} checked={isShowsSearch}/>
        </label>
        <label htmlFor='actors-search'>
          Actors 
          <input id="actors-search" type="radio" value="people" onChange={onRadioChange} checked={!isShowsSearch}/>
        </label>
      </div>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}  

    </MainPageLayout>
  );
};

export default Home;
