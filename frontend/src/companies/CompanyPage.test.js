import React from "react";
import { render } from "@testing-library/react";
import CompanyPage from "./CompanyPage";

test("CompanyPage renders without crashing", () => {
	render(<CompanyPage />);
});

test("CompanyPage matches snapshot", () => {
	const { asFragment } = render(<CompanyPage />);
	expect(asFragment()).toMatchSnapshot();
});
