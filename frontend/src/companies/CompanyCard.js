import React from "react";
import { Card, CardTitle, CardText, CardBody } from "reactstrap";

const CompanyCard = ({ name, desc, logoUrl }) => {
	return (
		<Card
			color="secondary"
			outline>
			<CardBody>
				<CardTitle tag="h5">{name}</CardTitle>

				<CardText>{desc}</CardText>
				{{ logoUrl } && (
					<img
						alt={name}
						src={logoUrl}
					/>
				)}
			</CardBody>
		</Card>
	);
};

export default CompanyCard;
