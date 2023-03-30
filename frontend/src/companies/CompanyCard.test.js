import React from "react";
import { render } from "@testing-library/react";
import CompanyCard from "./CompanyCard";

test("CompanyCard renders without crashing", () => {
	render(<CompanyCard />);
});

test("CompanyCard matches snapshot", () => {
	const { asFragment } = render(<CompanyCard />);
	expect(asFragment()).toMatchSnapshot();
});
