import React from 'react';
//bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
//components
import RecipeDetail from './RecipeDetail';
//icons
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const RecipeCard = ({ recipe, bookmarked, dispatch }) => {
	const { label, uri, image } = recipe;
	const setFav = () => {
		dispatch({ type: 'SET_FAV', uri: uri });
	};
	return (
		<Card style={{ minHeight: '10rem', marginBottom: 20 }}>
			<Card.Img variant="top" src={image} alt="recipe-img" />
			<Card.ImgOverlay>
				<Card.Title
					className="d-flex justify-content-space-around"
					style={{ background: 'rgba(255,255,255,0.6)' }}
				>
					<span style={{ margin: 'auto 0' }}>{label}</span>
					<Button className="rounded-0 ml-auto" variant="danger" onClick={setFav}>
						{bookmarked ? <FaHeart /> : <FaRegHeart />}
					</Button>
				</Card.Title>
				<RecipeDetail recipe={recipe} />
			</Card.ImgOverlay>
		</Card>
	);
};

export default RecipeCard;
