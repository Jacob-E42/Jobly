import React, { useEffect, useState } from "react";
import Search from "../common/Search";
import { Link } from "react-router-dom";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";
import "./Companies.css";

const CompanyList = () => {
	console.debug("CompanyList");
	const [companies, setCompanies] = useState([]);

	useEffect(() => {
		async function getCompanies() {
			let companies = await JoblyApi.getAllCompanies();
			console.log(companies.length);
			setCompanies(companies);
			console.log("companies", companies);
		}
		getCompanies();
	}, []);

	return (
		<div className="CompanyList">
			<Search allowedTerms={["minEmployees", "maxEmployees", "nameLike"]} />
			<div>
				{companies.map(c => {
					return (
						<Link to={`/companies/${c.handle}`}>
							<CompanyCard
								key={c.handle}
								name={c.name}
								desc={c.description}
								logo={c.logo_url}
							/>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default CompanyList;
