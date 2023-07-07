// CompanyList.test.js
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import CompanyList from "./CompanyList";
import mockJoblyApi from "./mockCompanies";
import CompanyPage from "./CompanyPage";

jest.mock("../api/api", () => mockJoblyApi);

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

test("renders CompanyList and displays companies", async () => {
	render(
		<MemoryRouter>
			<CompanyList />
		</MemoryRouter>
	);

	await waitFor(() => expect(mockJoblyApi.getAllCompanies).toHaveBeenCalled());

	mockJoblyApi.companies.forEach(c => {
		expect(screen.getByText(c.name)).toBeInTheDocument();
		expect(screen.getByText(c.description)).toBeInTheDocument();
	});
});

test("navigates to Company detail page on click", async () => {
	const { getByText, findByText } = render(
		<MemoryRouter>
			<Route path="/companies/:handle">
				<CompanyPage />
			</Route>
			<Route path="/">
				<CompanyList />
			</Route>
		</MemoryRouter>
	);

	await waitFor(() => expect(mockJoblyApi.getAllCompanies).toHaveBeenCalled());

	const firstCompany = mockJoblyApi.companies[0];
	fireEvent.click(screen.getByText(firstCompany.name));

	expect(screen.findByText(firstCompany.name)).toBeInTheDocument();
	expect(screen.findByText(firstCompany.description)).toBeInTheDocument();
});
