import React from "react";
import JobCard from "./JobCard";
import "./Jobs.css";

const JobCardList = ({ jobs }) => {
	return (
		<main className="JobCardList">
			{jobs &&
				jobs.map(job => (
					<JobCard
						key={job.id}
						job={job}
					/>
				))}
		</main>
	);
};

export default JobCardList;
