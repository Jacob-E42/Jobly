import React from "react";
import { Card, CardTitle, CardText, CardBody } from "reactstrap";
import logo1 from "../logos/logo1.png";
import logo2 from "../logos/logo2.png";
import logo3 from "../logos/logo3.png";
import logo4 from "../logos/logo4.png";
import "./Companies.css";

const CompanyCard = ({ name, desc, logoUrl }) => {
	const logos = {
		"/logos/logo1.png": logo1,
		"/logos/logo2.png": logo2,
		"/logos/logo3.png": logo3,
		"/logos/logo4.png": logo4
	};

	return (
		// Render a Card component

		<Card className="d-flex CompanyCard">
			<CardBody className="CardBody">
				{/* Render the card title with the company name*/}
				<CardTitle tag="h5">{name}</CardTitle>
				{/* Render the card text with the company description */}
				<CardText>{desc}</CardText>
			</CardBody>
			{/* Render the company logo */}
			{logoUrl && (
				<img
					className="card-image ml-5"
					src={logos[logoUrl]}
					alt={name}
				/>
			)}
		</Card>
	);
};

export default CompanyCard;
