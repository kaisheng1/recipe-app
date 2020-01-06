import axios from 'axios';

const APP_ID = process.env.REACT_APP_API_ID;
const APP_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_API_ENDPOINT;

//get recipes
export const getRecipes = async (limit = 10) => {
	const params = {
		app_key: APP_KEY,
		app_id: APP_ID,
		q: 'chicken',
		to: limit
	};
	const response = await axios.get(BASE_URL, { params });
	const data = await response.data;
	const hits = await data.hits;
	return hits;
};

//get recipes by search results
export const getRecipeByQuery = async (query, from = 0, to = 10) => {
	const params = {
		app_key: APP_KEY,
		app_id: APP_ID,
		q: query,
		from: from,
		to: to
	};
	const response = await axios.get(BASE_URL, { params });
	const data = await response.data;
	const hits = await data.hits;
	return hits;
};

//get recipes by filters
export const getRecipeByFilters = async (filters) => {
	const params = {
		app_key: APP_KEY,
		app_id: APP_ID,
		...filters
	};
	const response = await axios.get(BASE_URL, { params });
	const data = await response.data;
	const hits = await data.hits;
	return hits;
};

//get recipe by ID
export const getRecipeByID = async (id) => {
	const r = `http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${id}`;
	const response = await axios.get(`${BASE_URL}?app_id=${APP_ID}&app_key=${APP_KEY}&r=${r}`);
	const data = await response.data;
	return data[0];
};
