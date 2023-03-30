import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import Search from "../common/Search";
import JobCardList from "./JobCardList";

const JobList = () => {
	console.debug("JobList");
	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		search();
	}, []);

	const search = async title => {
		let jobs = await JoblyApi.getJobs(title);
		setJobs(jobs);
	};

	return (
		<div className="JobList">
			<Search searchFor={search} />
			<div>
				<JobCardList jobs={jobs} />
			</div>
		</div>
	);
};

export default JobList;
