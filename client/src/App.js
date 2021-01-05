import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ShoppingList from './components/ShoppingList';

import AppNav from './components/AppNav'

function App() {
  return (
    <div className="App">
      <AppNav />
      <ShoppingList />
    </div>
  );
}

export default App;