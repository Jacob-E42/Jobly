import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import JoblyApi from "../api/api";
import JobCardList from "../jobs/JobCardList";
import "../jobs/Jobs.css";

const CompanyPage = () => {
	const { handle } = useParams(); // Get the "handle" parameter from the URL
	console.debug("CompanyDetail", "handle=", handle);
	const [company, setCompany] = useState(null); // State to store the company data

	useEffect(() => {
		async function getCompany() {
			// Async function to fetch the company data based on the "handle"
			const company = await JoblyApi.getCompany(handle);
			setCompany(company);
		}
		getCompany(); // Call the async function to fetch the company data
	}, [handle]); // Run the effect whenever the "handle" parameter changes

	if (!company) return <LoadingSpinner />; // If company data is not available, show a loading spinner

	return (
		<section className="JobList">
			<p className="company-header">
				{" "}
				<h4>{company.name}</h4>
				<h6>{company.description}</h6>
			</p>

			<JobCardList jobs={company.jobs} />
		</section>
	);
};

export default CompanyPage;
