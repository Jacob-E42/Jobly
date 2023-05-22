import React from "react";
import { Card, CardTitle, CardText, CardBody } from "reactstrap";

const CompanyCard = ({ name, desc, logo }) => {
	return (
		// Render a Card component
		<Card
			className="my-2 Card"
			color="dark"
			outline
			style={{
				width: "18rem"
			}}>
			<CardBody>
				{/* Render the card title with the company name*/}
				<CardTitle tag="h5">{name}</CardTitle>
				{/* Render the card text with the company description */}
				<CardText>{desc}</CardText>
				{/* Render the company logo */}
				<img
					src={logo}
					alt={name}
				/>
			</CardBody>
		</Card>
	);
};

export default CompanyCard;
