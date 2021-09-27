import React from 'react';
import ReactDOM from 'react-dom';
import {  Footer, Header, CharacterSheet } from './Components';
import './style.css';
import {CharacterProvider} from './Components/Context/Character.context'

ReactDOM.render(
  <React.StrictMode>
		<Header />
		<main id="main">
			<CharacterProvider>
				<CharacterSheet />
			</CharacterProvider>
		</main>
		<Footer />
  </React.StrictMode>,
);