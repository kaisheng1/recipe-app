import React, { createContext, useReducer, useEffect } from 'react';

const Context = createContext();

const isValidLocalState = () => {
	const localState = localStorage.getItem('state');
	return localState !== undefined || localState !== '{}' || localState != '[]';
};
const initialState = isValidLocalState()
	? JSON.parse(localStorage.getItem('state'))
	: {
			recipes: [],
			favourite: []
		};

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_RECIPES':
			const recipesAddFav = action.payload.map((recipe) => {
				if (state.favourite.some((fav) => fav.recipe.uri === recipe.recipe.uri && !recipe.bookmarked)) {
					return { ...recipe, bookmarked: true };
				}
				return recipe;
			});
			return { ...state, recipes: recipesAddFav };
		case 'SET_FAV':
			let fav = {};
			const searchRecipe = state.recipes.filter((recipe) => recipe.recipe.uri === action.uri)[0];
			const unfav = searchRecipe ? searchRecipe.bookmarked : true; //if not in state.recipes, it must be in state.favourite
			const existedInRecipes = searchRecipe ? true : false;

			if (unfav && !existedInRecipes) {
				return { ...state, favourite: state.favourite.filter((recipe) => recipe.recipe.uri !== action.uri) };
			}
			return {
				...state,
				recipes: state.recipes.map((recipe) => {
					if (recipe.recipe.uri !== action.uri) {
						return recipe;
					} else {
						fav = { ...recipe, bookmarked: !recipe.bookmarked };
						return fav;
					}
				}),
				favourite: unfav
					? state.favourite.filter((recipe) => recipe.recipe.uri !== action.uri)
					: state.favourite.includes(fav) ? state.favourite : [ ...state.favourite, fav ]
			};
		default:
			return state;
	}
};

const ContextProvider = ({ children }) => {
	const [ state, dispatch ] = useReducer(reducer, initialState);
	useEffect(
		() => {
			localStorage.setItem('state', JSON.stringify(state));
		},
		[ state ]
	);
	const value = { state, dispatch };

	return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
