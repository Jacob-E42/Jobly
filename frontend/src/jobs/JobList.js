import React, { useState, useEffect, useContext, useCallback } from "react";
import JoblyApi from "../api/api";
import Search from "../common/Search";
import JobCardList from "./JobCardList";
import "./Jobs.css";
import AlertContext from "../context_providers/AlertContext";
import LoadingSpinner from "../common/LoadingSpinner";

const JobList = () => {
	console.debug("JobList");
	const [jobs, setJobs] = useState([]);
	const { setMsg, setColor } = useContext(AlertContext);

	const search = useCallback(
		async title => {
			let jobs = await JoblyApi.getJobs(title);
			if (jobs.length === 0) {
				setMsg("There are no jobs with that search term.");
				setColor("danger");
			}
			setJobs(jobs);
		},
		[setMsg, setColor]
	);

	useEffect(() => {
		search();
	}, [search]);

	if (!jobs || jobs.length < 1) return <LoadingSpinner />;

	return (
		<section className="JobList ">
			<Search searchFor={search} />

			<JobCardList jobs={jobs} />
		</section>
	);
};

export default JobList;
