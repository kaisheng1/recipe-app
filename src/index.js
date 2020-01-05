import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ContextProvider } from './context';
import 'bootstrap/dist/css/bootstrap.min.css';

//todo:
//maybe add pagination
//maybe styling recipe detail a bit

ReactDOM.render(
	<ContextProvider>
		<App />
	</ContextProvider>,
	document.getElementById('root')
);
