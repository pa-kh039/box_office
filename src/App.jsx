import React from "react";
import {Switch , Route} from 'react-router-dom';
import Nav from "./components/Nav";
import Home from './pages/Home';
import Starred from './pages/Starred';

function App() {
  return ( <div>
    <Nav/>
  <Switch>
    
    <Route exact path="/"><Home/></Route>
    {/* instead of exact={true}, u can write just exact. this  is true only for boolean props */}
    <Route exact path="/starred"><Starred/></Route>
    {/* without exact, the starred page is being rendered for both http://localhost:3000/starred and http://localhost:3000/starred/jdsd , yaane ki starred ke baad kahi bhi chle jao to bhi starred page is rendered */}

    <Route><div>NOT FOUND</div></Route>
    {/* default page for all the routes not exactly mentioned in the switch */}
  </Switch>
  </div> );
}

export default App;
