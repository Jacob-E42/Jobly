import React from "react";
import JobCard from "../jobs/JobCard";
import "./Jobs.css";

const JobList = ({ jobs }) => {
	return (
		<div className="JobList">
			{jobs.map(job => (
				<JobCard job={job} />
			))}
		</div>
	);
};

export default JobList;
