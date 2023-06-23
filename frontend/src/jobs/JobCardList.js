import React from "react";
import JobCard from "./JobCard";
import "./Jobs.css";

const JobCardList = ({ jobs }) => {
	return (
		<div
			className="JobCardList
		">
			{jobs.map(job => (
				<JobCard
					key={job.id}
					job={job}
				/>
			))}
		</div>
	);
};

export default JobCardList;
