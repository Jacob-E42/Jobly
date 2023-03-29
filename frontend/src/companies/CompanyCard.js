import React from "react";
import { Card, CardTitle, CardText, CardBody } from "reactstrap";

const CompanyCard = ({ name, desc, logo }) => {
	return (
		<Card
			className="my-2 Card"
			color="dark"
			outline
			style={{
				width: "18rem"
			}}>
			<CardBody>
				<CardTitle tag="h5">{name}</CardTitle>

				<CardText>{desc}</CardText>
				{
					<img
						src={logo}
						alt={name}
					/>
				}
			</CardBody>
		</Card>
	);
};

export default CompanyCard;
