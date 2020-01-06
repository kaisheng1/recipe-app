import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../context';
//bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//components
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';
import PaginationBar from './PaginationBar';
//services
import { getRecipeByQuery } from '../services/recipe';

//list to contain RecipeCard
const RecipeList = () => {
	const { state, dispatch } = useContext(Context);
	const { recipes } = state;
	const initialSearch = 'chicken';
	const [ query, setQuery ] = useState('');
	const searchRecipes = (value) => {
		getRecipeByQuery(value)
			.then((res) => {
				setQuery(value);
				dispatch({ type: 'SET_RECIPES', payload: res });
			})
			.catch((err) => {
				console.error(err);
			});
	};
	const switchPage = (currentPage) => {
		const from = (currentPage - 1) * 10;
		const to = currentPage * 10;

		getRecipeByQuery(query, from, to)
			.then((res) => {
				dispatch({ type: 'SET_RECIPES', payload: res });
			})
			.catch((err) => {
				console.error(err);
			});
	};
	//for first time
	useEffect(() => {
		getRecipeByQuery(initialSearch)
			.then((res) => {
				setQuery(initialSearch);
				dispatch({ type: 'SET_RECIPES', payload: res });
			})
			.catch((err) => {
				console.error(err);
			});
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
			<PaginationBar switchPage={switchPage} />
		</div>
	);
};

export default RecipeList;
