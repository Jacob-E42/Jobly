import "./Companies.css";
import React, { useContext, useEffect, useState } from "react";
import Search from "../common/Search";
import { Link } from "react-router-dom";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../common/LoadingSpinner";
import Alert from "../common/Alert";
import AlertContext from "../context_providers/AlertContext";

const CompanyList = () => {
	console.debug("CompanyList"); // Debugging statement to log "CompanyList"

	const [companies, setCompanies] = useState([]); // State to store the list of companies
	const { setMsg, setColor } = useContext(AlertContext);

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

		if (companiesFromApi.length === 0) {
			setMsg("There are no companies with that search term.");
			setColor("danger");
		}
		setCompanies(companiesFromApi);
	};

	if (!companies) return <LoadingSpinner />;

	return (
		<div className="CompanyList">
			<Search searchFor={search} />{" "}
			{/* Render the Search component with the searchFor prop set to the search function */}
			<div className="CompanyCardGroup">
				{companies.map(c => {
					console.log(companies);
					return (
						<Link
							className="router-link "
							key={c.handle}
							to={`/companies/${c.handle}`}>
							<CompanyCard
								key={c.handle}
								name={c.name}
								desc={c.description}
								logoUrl={c.logoUrl}
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
