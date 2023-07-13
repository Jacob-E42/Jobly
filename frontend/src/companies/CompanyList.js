import "./Companies.css";
import React, { useEffect, useState } from "react";
import Search from "../common/Search";
import { Link } from "react-router-dom";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../common/LoadingSpinner";
import Alert from "../common/Alert";

const CompanyList = () => {
	console.debug("CompanyList"); // Debugging statement to log "CompanyList"

	const [companies, setCompanies] = useState([]); // State to store the list of companies
	const [error, setError] = useState(null);

	useEffect(() => {
		search();
	}, []);

	const search = async name => {
		// Perform a search for companies with the provided name
		let response;
		if (name) {
			response = await JoblyApi.getCompanies(name);
			console.log("response", response);
		} else {
			response = await JoblyApi.getAllCompanies();
			console.log("response", response);
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

	if (!companies) return <LoadingSpinner />;

	return (
		<div className="CompanyList col-md-8 offset-md-2">
			{error && (
				<Alert
					msg={error}
					color="failure"
				/>
			)}
			<Search searchFor={search} />{" "}
			{/* Render the Search component with the searchFor prop set to the search function */}
			<div className="CompanyCardGroup">
				{companies.map(c => {
					return (
						<Link
							className="router-link CompanyCard card"
							key={c.handle}
							to={`/companies/${c.handle}`}>
							<CompanyCard
								key={c.handle}
								name={c.name}
								desc={c.description}
								logo={c.logo_url}
							/>
						</Link>
					);
				})}
				;
			</div>
		</div>
	);
};

export default CompanyList;
