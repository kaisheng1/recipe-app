import React, { useContext, useEffect } from 'react';
import { Context } from '../context';
//bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//components
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';
//services
import { getRecipeByQuery } from '../services/recipe';

//list to contain RecipeCard
const RecipeList = () => {
	const { state, dispatch } = useContext(Context);
	const { recipes } = state;
	const initialSearch = 'chicken';
	const searchRecipes = (value) => {
		getRecipeByQuery(value).then((res) => dispatch({ type: 'SET_RECIPES', payload: res }));
	};
	//for first time
	useEffect(() => {
		getRecipeByQuery(initialSearch).then((res) => dispatch({ type: 'SET_RECIPES', payload: res }));
	}, []);
	return (
		<div>
			<SearchBar initialSearch={initialSearch} onSearch={searchRecipes} />
			<Row>
				{recipes.map((recipe) => {
					return (
						<Col md={6} lg={4} key={recipe.uri}>
							<RecipeCard {...recipe} dispatch={dispatch} />
						</Col>
					);
				})}
			</Row>
		</div>
	);
};

export default RecipeList;
