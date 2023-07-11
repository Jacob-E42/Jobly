import React, { useEffect, useState } from "react";
import Search from "../common/Search";
import { Link } from "react-router-dom";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../common/LoadingSpinner";
import Alert from "../common/Alert";
import "./Companies.css";

const CompanyList = () => {
	console.debug("CompanyList"); // Debugging statement to log "CompanyList"

	const [companies, setCompanies] = useState([]); // State to store the list of companies
	const [error, setError] = useState(null);

	useEffect(() => {
		search();
	}, []);

	// const search = async name => {
	// 	// Perform a search for companies with the provided name
	// 	let companiesFromApi;
	// 	if (name) {
	// 		companiesFromApi = await JoblyApi.getCompanies(name);
	// 	} else {
	// 		companiesFromApi = await JoblyApi.getAllCompanies();
	// 	}
	// 	if (companiesFromApi.length === 0) {
	// 		setError("There are no companies");
	// 		return;
	// 	}
	// 	setCompanies(companiesFromApi);
	// };
	const search = async name => {
		// Perform a search for companies with the provided name
		let response;
		if (name) {
			response = await JoblyApi.getCompanies(name);
		} else {
			response = await JoblyApi.getAllCompanies();
		}
		let companiesFromApi = response ? response : []; // This line is modified.
		// Adjust it as per your actual API response structure.
		// 'data' is used assuming you're getting an object with a 'data' field containing the array.

		if (companiesFromApi.length === 0) {
			setError("There are no companies");
			return;
		}
		setCompanies(companiesFromApi);
	};

	if (error) {
		return (
			<Alert
				msg={error}
				color="failure"
			/>
		);
	}

	if (!companies) return <LoadingSpinner />;

	return (
		<div className="CompanyList">
			<Search searchFor={search} />{" "}
			{/* Render the Search component with the searchFor prop set to the search function */}
			<div>
				{companies.map(c => {
					return (
						<Link
							key={c.handle}
							to={`/companies/${c.handle}`} // Link to the company detail page
						>
							<CompanyCard
								key={c.handle}
								name={c.name}
								desc={c.description}
								logo={c.logo_url}
							/>{" "}
							{/* Render the CompanyCard component with company details */}
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default CompanyList;
