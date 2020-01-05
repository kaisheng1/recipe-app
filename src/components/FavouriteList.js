import React, { useContext, useState } from 'react';
import { Context } from '../context';
//bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//components
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';

const FavouriteList = () => {
	const { state, dispatch } = useContext(Context);
	const [ search, setSearch ] = useState('');
	const favourite = state.favourite.filter((recipe) =>
		recipe.recipe.label.toLowerCase().includes(search.toLowerCase())
	);

	const onSearch = (value) => {
		setSearch(value);
	};

	return (
		<div>
			<SearchBar onSearch={onSearch} />
			<Row>
				{favourite.map((recipe) => {
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

export default FavouriteList;
