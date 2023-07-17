import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import Search from "../common/Search";
import JobCardList from "./JobCardList";
import { Container, Row, Col } from "reactstrap";
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
