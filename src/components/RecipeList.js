import React, { useContext } from 'react';
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
	const searchRecipes = (value) => {
		getRecipeByQuery(value).then((res) => dispatch({ type: 'SET_RECIPES', payload: res }));
	};
	return (
		<div>
			<SearchBar onSearch={searchRecipes} />
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
