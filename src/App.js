import React from 'react';
//bootstrap
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
//components
import RecipeList from './components/RecipeList';
import FavouriteList from './components/FavouriteList';

function App() {
	return (
		<div className="container">
			<Tabs defaultActiveKey="home">
				<Tab eventKey="home" title="Home">
					<RecipeList />
				</Tab>
				<Tab eventKey="favourite" title="Favourite">
					<FavouriteList />
				</Tab>
			</Tabs>
		</div>
	);
}

export default App;
