import React from 'react';
import logo from './logo.svg';
import './App.css';
import'bootstrap/dist/css/bootstrap.css';
import HeaderComponent from './header/HeaderComponent';
import ViewCustomers from './components/ViewCustomers';

function App() {
  return (
    <div className="App">
     <HeaderComponent></HeaderComponent>
    
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        
      </header> */}
    </div>
  );
}

export default App;
