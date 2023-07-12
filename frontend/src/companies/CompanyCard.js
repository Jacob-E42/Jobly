import React from "react";
import { Card, CardTitle, CardText, CardBody } from "reactstrap";
// import { Link } from "react-router-dom";
import "./Companies.css";

const CompanyCard = ({ name, desc, logo, Link }) => {
	return (
		// Render a Card component

		<Card
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
