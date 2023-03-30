import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import addCommas from "./addCommas";
import "./Jobs.css";

const JobCard = ({ job }) => {
	return (
		<Card
			className="my-2 Card"
			color="dark"
			outline
			style={{
				width: "18rem"
			}}>
			<CardBody>
				<CardTitle tag="h5">{job.title}</CardTitle>

				<CardText>
					<p>Salary: {job.salary ? addCommas(job.salary) : "N/A"}</p>
					<p>Equity: {job.equity ? job.equity : 0}</p>
				</CardText>
			</CardBody>
		</Card>
	);
};

export default JobCard;
