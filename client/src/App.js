import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/itemModal';
import { Container } from 'reactstrap';
import { loadUser } from './actions/authActions';
import AppNav from './components/AppNav'

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
        <Provider store={store}>
            <div className="App">
                <AppNav />
                <Container>
                    <ItemModal />
                    <ShoppingList />
                </Container>
            </div>
        </Provider>
      );
    }
}

export default App;