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
		search();
	}, []);

	const search = async name => {
		let companies = await JoblyApi.getCompanies(name);
		setCompanies(companies);
	};

	return (
		<div className="CompanyList">
			<Search searchFor={search} />
			<div>
				{companies.map(c => {
					return (
						<Link
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
			</div>
		</div>
	);
};

export default CompanyList;
