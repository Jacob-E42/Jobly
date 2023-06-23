import React, { useEffect, useState } from "react";
import Search from "../common/Search";
import { Link } from "react-router-dom";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";
import "./Companies.css";

const CompanyList = () => {
	console.debug("CompanyList"); // Debugging statement to log "CompanyList"

	const [companies, setCompanies] = useState([]); // State to store the list of companies

	useEffect(() => {
		search();
	}, []);

	const search = async name => {
		// Perform a search for companies with the provided name
		let companies;
		if (name) companies = await JoblyApi.getCompanies(name);
		else companies = await JoblyApi.getAllCompanies();

		setCompanies(companies);
	};

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
