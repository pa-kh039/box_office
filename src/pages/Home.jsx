import React , {useState} from 'react';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import ActorGrid from '../components/actor/ActorGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Home.styled';
import CustomRadio from '../components/CustomRadio';
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
      <SearchInput type="text" placeholder="Search for something" onChange={onInputChange} onKeyDown={onKeyDown} value={input}/>
      <RadioInputsWrapper>
        <div>
        <CustomRadio label="Shows" id="shows-search" value="shows" onChange={onRadioChange} checked={isShowsSearch}/>
        </div>
        <div>
        <CustomRadio label ="Actors" id="actors-search" value="people" onChange={onRadioChange} checked={!isShowsSearch}/>
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      </SearchButtonWrapper>
      {renderResults()}  

    </MainPageLayout>
  );
};

export default Home;
