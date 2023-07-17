import React from "react";
import JobCard from "./JobCard";
import "./Jobs.css";

const JobCardList = ({ jobs }) => {
	return (
		// <Col className=".col-sm-12 .col-md-6 .offset-md-3">
		<main className="JobCardList">
			{jobs &&
				jobs.map(job => (
					<JobCard
						key={job.id}
						job={job}
					/>
				))}
		</main>

		// </Col>
	);
};

export default JobCardList;
