import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../context';
//bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
//components
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';
import PaginationBar from './PaginationBar';
//services
import { getRecipeByQuery } from '../services/recipe';

//list to contain RecipeCard
const RecipeList = () => {
	//useState
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState(null);
	const [ query, setQuery ] = useState('');

	const { state, dispatch } = useContext(Context);
	const { recipes } = state;
	const initialSearch = 'chicken';

	const searchRecipes = (value) => {
		setLoading(true);
		setError(null);
		getRecipeByQuery(value)
			.then((res) => {
				setQuery(value);
				dispatch({ type: 'SET_RECIPES', payload: res });
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const switchPage = (currentPage) => {
		const from = (currentPage - 1) * 10;
		const to = currentPage * 10;

		setLoading(true);
		setError(null);
		getRecipeByQuery(query, from, to)
			.then((res) => {
				dispatch({ type: 'SET_RECIPES', payload: res });
			})
			.catch((err) => {
				setError(err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	//for first time
	useEffect(() => {
		setLoading(true);
		setError(null);
		getRecipeByQuery(initialSearch)
			.then((res) => {
				setQuery(initialSearch);
				dispatch({ type: 'SET_RECIPES', payload: res });
			})
			.catch((err) => {
				setError(err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	return (
		<div>
			<SearchBar initialSearch={initialSearch} onSearch={searchRecipes} />
			<Row>
				{loading ? (
					<span className="ml-4">
						<Spinner animation="border" variant="dark" />
					</span>
				) : error ? (
					<span className="ml-4">{error}</span>
				) : (
					recipes.map((recipe) => {
						return (
							<Col md={6} lg={4}>
								<RecipeCard {...recipe} key={recipe.uri} dispatch={dispatch} />
							</Col>
						);
					})
				)}
			</Row>
			<PaginationBar switchPage={switchPage} />
		</div>
	);
};

export default RecipeList;
