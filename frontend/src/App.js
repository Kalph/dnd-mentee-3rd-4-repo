import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {LoginForm, Login, Post} from './components';
import {Home} from './pages';

const App = () =>{
  return (
    <div>
        <Route exact path="/" component={Home}/>
    </div>
  );
};

export default App;
