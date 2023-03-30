import React from "react";
import JobCard from "./JobCard";
import "./Jobs.css";

const JobCardList = ({ jobs }) => {
	return (
		<div
			className="JobCardList
		">
			{jobs.map(job => (
				<JobCard job={job} />
			))}
		</div>
	);
};

export default JobCardList;
