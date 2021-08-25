import './App.css';
import React from 'react';

import Game from './components/Game/Game';
import Join from './components/Join/Join';

import { BrowserRouter as Router, Route } from "react-router-dom";


function App()  {


  return (
    <Router>
      <Route path="/" exact component={Join} />
      
      <Route path = "/game/:gameid" exact>
        <Game />
      </Route>
    </Router>
    
  );
}

export default App;