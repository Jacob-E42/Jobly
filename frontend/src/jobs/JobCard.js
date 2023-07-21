import React, { useCallback, useContext, useState } from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import addCommas from "./addCommas";
import UserContext from "../context_providers/UserContext";
import ApplicationsContext from "../context_providers/ApplicationsContext";
import "./Jobs.css";
import AlertContext from "../context_providers/AlertContext";

const JobCard = ({ job }) => {
	if (!job) throw new Error("You must provide a job!");
	const { setMsg, setColor } = useContext(AlertContext);
	const { currentUser } = useContext(UserContext);
	const { apply, applications } = useContext(ApplicationsContext);
	const [applied, setApplied] = useState(applications.includes(job.id) ? true : false);

	const handleApply = useCallback(async () => {
		console.debug("handleApply");
		try {
			// if (currentUser.applications.includes(job.id))
			await apply(currentUser.username, job.id);
			setMsg("You applied!");
			setColor("success");
			setApplied(true);
		} catch (error) {
			console.error(error);
		}
	}, [setMsg, setColor, setApplied, apply, job, currentUser]);

	return (
		<Card className="JobCard">
			{job && (
				<CardBody>
					<CardTitle tag="h5">{job.title}</CardTitle>
					<CardText>
						<span className="fw-bold">Salary: {job.salary ? addCommas(job.salary) : "N/A"}</span>
						<br />
						<span className="fw-bold">Equity: {job.equity ? job.equity : 0}</span>
					</CardText>
					{!applied ? (
						<Button
							color="danger"
							onClick={handleApply}>
							Apply
						</Button>
					) : (
						<Button
							color="secondary"
							disabled>
							Applied
						</Button>
					)}
				</CardBody>
			)}
		</Card>
	);
};

export default JobCard;
