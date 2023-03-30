import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import JoblyApi from "../api/api";
import JobList from "../jobs/JobList";

const CompanyPage = () => {
	const { handle } = useParams();
	console.debug("CompanyDetail", "handle=", handle);
	const [company, setCompany] = useState(null);

	useEffect(() => {
		async function getCompany() {
			const company = await JoblyApi.getCompany(handle);
			setCompany(company);
		}
		getCompany();
	}, [handle]);

	if (!company) return <LoadingSpinner />;

	return (
		<div>
			<h4>{company.name}</h4>
			<p>{company.description}</p>
			<JobList jobs={company.jobs} />
		</div>
	);
};

export default CompanyPage;
