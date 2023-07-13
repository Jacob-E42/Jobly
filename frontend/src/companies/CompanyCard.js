import React from "react";
import { Card, CardTitle, CardText, CardBody } from "reactstrap";
import logo1 from "../logos/logo1.png";
import "./Companies.css";

const CompanyCard = ({ name, desc, logo }) => {
	return (
		// Render a Card component

		<Card>
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
