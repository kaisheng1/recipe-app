import React, { createContext, useReducer, useMemo } from 'react';

const Context = createContext();

const initialState = {
	recipes: [
		{
			recipe: {
				uri: 1,
				label: 'chicken salad'
			},
			bookmarked: false
		},
		{
			recipe: {
				uri: 2,
				label: 'chicken rice'
			},
			bookmarked: false
		},
		{
			recipe: {
				uri: 3,
				label: 'chicken noodle'
			},
			bookmarked: false
		}
	],
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
	const value = useMemo(() => ({ state, dispatch }), [ state, dispatch ]);
	return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
