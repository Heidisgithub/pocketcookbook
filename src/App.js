import logo from './logo.svg';
import './App.css';
import { useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import RecipeList from './RecipeList';
import Recipe from './Recipe';

function App() {
  
  return (
    <Router basename="/pocketcookbook/">
    <div className="App">
        <h1 className="header">My Pocket Cookbook</h1>

    </div>
    <Switch>
      <Route exact path="/"><RecipeList/></Route>
      <Route path="/recipe/:recipeId"><Recipe/></Route>
    </Switch>
    </Router>
  );
}


export default App;
