import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import Search from "../common/Search";
import JobCardList from "./JobCardList";
import "./Jobs.css";

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
		<div className="JobList col-md-8 offset-md-2">
			<Search
				searchFor={search}
				className="searchForm"
			/>
			<div>
				<JobCardList jobs={jobs} />
			</div>
		</div>
	);
};

export default JobList;
