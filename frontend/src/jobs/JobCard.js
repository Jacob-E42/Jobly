import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import addCommas from "./addCommas";
import "./Jobs.css";

const JobCard = ({ job }) => {
	return (
		<Card
			className="my-2 Card" // Custom CSS class for the Card component
			color="dark"
			outline // Render the Card component in an outlined style
			style={{
				width: "18rem"
			}}>
			<CardBody>
				<CardTitle tag="h5">{job.title}</CardTitle>{" "}
				{/* Render the job title as a heading in the Card component */}
				<CardText>
					<p>Salary: {job.salary ? addCommas(job.salary) : "N/A"}</p>{" "}
					{/* Render the job salary, or "N/A" if not available */}
					<p>Equity: {job.equity ? job.equity : 0}</p> {/* Render the job equity, or 0 if not available */}
				</CardText>
			</CardBody>
		</Card>
	);
};

export default JobCard;
