import React, { useContext, useEffect } from 'react';
import { Context } from './context';
//bootstrap
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
//components
import RecipeList from './components/RecipeList';
import FavouriteList from './components/FavouriteList';
//services
import { getRecipes } from './services/recipe';

function App() {
	const { dispatch } = useContext(Context);
	useEffect(() => {
		getRecipes(20).then((res) => {
			dispatch({ type: 'SET_RECIPES', payload: res });
		});
	}, []);

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
