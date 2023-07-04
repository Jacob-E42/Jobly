import React, { useContext, useState } from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import addCommas from "./addCommas";
import "./Jobs.css";
import UserContext from "../UserContext";

const JobCard = ({ job }) => {
	const { currentUser, apply } = useContext(UserContext);
	const [applied, setApplied] = useState(currentUser.applications.includes(job.id) ? true : false);

	const handleApply = async () => {
		console.debug("handleApply");
		try {
			// if (currentUser.applications.includes(job.id))
			await apply(currentUser.username, job.id);
			setApplied(true);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Card
			className="my-2 Card"
			color="dark"
			outline
			style={{ width: "18rem" }}>
			{job && (
				<CardBody className="d-flex flex-column">
					<CardTitle tag="h5">{job.title}</CardTitle>
					<CardText className="mb-auto">
						<span>Salary: {job.salary ? addCommas(job.salary) : "N/A"}</span>
						<span>Equity: {job.equity ? job.equity : 0}</span>
					</CardText>
					{!applied ? (
						<Button
							color="danger"
							onClick={handleApply}
							className="mt-auto">
							Apply
						</Button>
					) : (
						<Button
							color="secondary"
							disabled
							className="mt-auto">
							Applied
						</Button>
					)}
				</CardBody>
			)}
		</Card>
	);
};

export default JobCard;
