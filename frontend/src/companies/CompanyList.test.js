import React from "react";
import { render } from "@testing-library/react";
import CompanyList from "./CompanyList";

test("CompanyList renders without crashing", () => {
	render(<CompanyList />);
});

test("CompanyList matches snapshot", () => {
	const { asFragment } = render(<CompanyList />);
	expect(asFragment()).toMatchSnapshot();
});
