import React, { useEffect, useState } from "react";
import Search from "../common/Search";
import { Link } from "react-router-dom";

const CompanyList = () => {
	const [companies, setCompanies] = useState([]);

	useEffect();

	return (
		<div>
			<Search allowedTerms={["minEmployees", "maxEmployees", "nameLike"]} />
		</div>
	);
};

export default CompanyList;
