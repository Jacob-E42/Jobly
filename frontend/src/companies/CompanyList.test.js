import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CompanyList from "./CompanyList";

test("CompanyList renders without crashing", () => {
	render(
		<MemoryRouter>
			<CompanyList />
		</MemoryRouter>
	);
});

test("CompanyList matches snapshot", () => {
	const { asFragment } = render(
		<MemoryRouter>
			<CompanyList />
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});
