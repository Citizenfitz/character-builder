import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {  Footer, Header, CharacterSheet } from './Components';
import './style.css';



ReactDOM.render(
  <React.StrictMode>
  <Header />
  <main id="main">
    <CharacterSheet />
   </main>
   <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);


