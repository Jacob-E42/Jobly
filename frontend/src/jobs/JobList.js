import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "../api/api";
import Search from "../common/Search";
import JobCardList from "./JobCardList";
import { Container, Row, Col } from "reactstrap";
import "./Jobs.css";
import AlertContext from "../context_providers/AlertContext";

const JobList = () => {
	console.debug("JobList");
	const [jobs, setJobs] = useState([]);
	const { setMsg, setColor } = useContext(AlertContext);

	useEffect(() => {
		search();
	}, []);

	const search = async title => {
		let jobs = await JoblyApi.getJobs(title);
		if (jobs.length === 0) {
			setMsg("There are no jobs with that search term.");
			setColor("danger");
		}
		setJobs(jobs);
	};

	return (
		<Container className="JobList ">
			<Row>
				<Search
					searchFor={search}
					className="searchForm"
				/>

				<JobCardList jobs={jobs} />
			</Row>
		</Container>
	);
};

export default JobList;
