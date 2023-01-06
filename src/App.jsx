// import React, {useEffect} from "react";
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
// import Nav from "./components/Nav";
import Home from './pages/Home';
import Starred from './pages/Starred';
import Show from './pages/Show';

const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        {/* instead of exact={true}, u can write just exact. this  is true only for boolean props */}
        <Route exact path="/starred">
          <Starred />
        </Route>
        {/* without exact, the starred page is being rendered for both http://localhost:3000/starred and http://localhost:3000/starred/jdsd , yaane ki starred ke baad kahi bhi chle jao to bhi starred page is rendered */}
        <Route exact path="/show/:id">
          <Show />
        </Route>
        <Route>
          <div>NOT FOUND</div>
        </Route>
        {/* default page for all the routes not exactly mentioned in the switch */}
      </Switch>
    </ThemeProvider>
  );
}

export default App;
