import React from 'react';
// import {Route, Switch} from 'react-router-dom';
// import Starred from '../pages/Starred';
import Nav from './Nav';
import Title from './Title';
// import Home from '../pages/Home';

const MainPageLayout = ({children}) => {
  return <div>
    <Title title="Box Office" subtitle="You're looking for a movie or an actor?"/>
  <Nav/>
  {children}
</div>;
};

export default MainPageLayout;
