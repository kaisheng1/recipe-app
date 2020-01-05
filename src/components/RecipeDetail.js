import React from 'react';
//bootstrap
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

const popover = ({ label, dietLabels, healthLabels, ingredientLines, calories, cautions }) => (
	<Popover id="popover-basic">
		<Popover.Title as="h3">{label}</Popover.Title>
		<Popover.Content>
			{dietLabels &&
				dietLabels.map((l) => (
					<Badge className="mr-1" variant="info">
						{l}
					</Badge>
				))}
			{healthLabels &&
				healthLabels.map((l) => (
					<Badge className="mr-1" variant="warning">
						{l}
					</Badge>
				))}
			{cautions &&
				cautions.map((l) => (
					<Badge className="mr-1" variant="danger">
						{l}
					</Badge>
				))}
			<h6>Ingredients: </h6>
			<ul>{ingredientLines && ingredientLines.map((l) => <li>{l}</li>)}</ul>
		</Popover.Content>
	</Popover>
);

const RecipeDetail = ({ recipe }) => {
	if (recipe) {
		return (
			<OverlayTrigger trigger="click" placement="right" overlay={popover(recipe)}>
				<Button variant="info">View recipe</Button>
			</OverlayTrigger>
		);
	}

	return <div />;
};

export default RecipeDetail;
