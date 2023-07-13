import React from "react";
import { Card, CardTitle, CardText, CardBody, CardImg } from "reactstrap";
import logo1 from "../logos/logo1.png";
import logo2 from "../logos/logo2.png";
import logo3 from "../logos/logo3.png";
import logo4 from "../logos/logo4.png";

import "./Companies.css";

const CompanyCard = ({ name, desc, logoUrl }) => {
	console.log(logoUrl);
	const logos = {
		"/logos/logo1.png": logo1,
		"/logos/logo2.png": logo2,
		"/logos/logo3.png": logo3,
		"/logos/logo4.png": logo4
	};

	return (
		// Render a Card component

		<Card>
			<CardBody>
				{/* Render the card title with the company name*/}
				<CardTitle tag="h5">{name}</CardTitle>
				{/* Render the card text with the company description */}
				<CardText>{desc}</CardText>
				{/* Render the company logo */}
				<CardImg
					className="card-image"
					src={logos[logoUrl]}
					alt={name}
				/>
			</CardBody>
		</Card>
	);
};

export default CompanyCard;
