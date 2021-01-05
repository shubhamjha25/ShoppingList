import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import ShoppingList from './components/ShoppingList';

import AppNav from './components/AppNav'

function App() {
  return (
    <Provider store={store}>
        <div className="App">
            <AppNav />
            <ShoppingList />
        </div>
    </Provider>
  );
}

export default App;