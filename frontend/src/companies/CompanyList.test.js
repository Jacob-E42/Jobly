const companies = [
	{
		handle: "mejia-scott-ryan",
		name: "Mejia, Scott and Ryan",
		description: "General traditional late situation discussion dog. Before best up strategy about direction.",
		logo_url: "/logos/logo4.png"
	},
	{
		handle: "mueller-moore",
		name: "Mueller-Moore",
		numEmployees: 932,
		description: "Edge may report though least pressure likely. Cost short appear program hair seven.",
		logo_url: "/logos/logo2.png"
	},
	{
		handle: "pugh-ltd",
		name: "Pugh Ltd",
		numEmployees: 87,
		description: "Believe reflect perform TV son.",
		logo_url: "/logos/logo2.png"
	},
	{
		handle: "carr-wells-jones",
		name: "Carr, Wells and Jones",
		numEmployees: 27,
		description: "Human medical throw book pick possible. Maybe yeah word beat treatment impact campaign.",
		logo_url: "/logos/logo3.png"
	},
	{
		handle: "hall-mills",
		name: "Hall-Mills",
		numEmployees: 266,
		description: "Change stage tell note hundred. Worry where program wait.",
		logo_url: "/logos/logo3.png"
	}
];

jest.mock("../api/api", () => ({
	__esModule: true, // this property makes it work
	default: {
		getAllCompanies: jest.fn().mockResolvedValue(companies),
		getCompanies: jest
			.fn()
			.mockImplementation(name => Promise.resolve(companies.filter(c => c.name.includes(name))))
	}
}));

// CompanyList.test.js
import mockJobly from "../api/api";
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { UserProvider } from "../mock";
import CompanyList from "./CompanyList";

// rest of your tests

test("CompanyList renders without crashing", () => {
	render(
		<MemoryRouter>
			<UserProvider>
				<CompanyList />
			</UserProvider>
		</MemoryRouter>
	);
});

test("CompanyList matches snapshot", () => {
	const { asFragment } = render(
		<MemoryRouter>
			<UserProvider>
				<CompanyList />
			</UserProvider>
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});

test("renders CompanyList and displays companies", async () => {
	render(
		<MemoryRouter>
			<UserProvider>
				<CompanyList />
			</UserProvider>
		</MemoryRouter>
	);

	await console.log(mockJobly.getAllCompanies);

	expect(jest.isMockFunction(mockJobly.getAllCompanies)).toBe(true);
	expect(jest.isMockFunction(mockJobly.getCompanies)).toBe(true);
	await expect(mockJobly.getAllCompanies).toBeCalled();

	companies.forEach(c => {
		expect(screen.getByText(c.name)).toBeInTheDocument();
		expect(screen.getByText(c.description)).toBeInTheDocument();
	});
});

// test("navigates to Company detail page on click", async () => {
// 	const { getByText, findByText } = render(
// 		<MemoryRouter>
// 			<UserProvider>
// 				<CompanyList />
// 			</UserProvider>
// 		</MemoryRouter>
// 	);

// 	await waitFor(() => expect(mockJoblyApi.getAllCompanies).toHaveBeenCalled());

// 	const firstCompany = mockJoblyApi.companies[0];
// 	fireEvent.click(screen.getByText(firstCompany.name));

// 	expect(screen.getByText(firstCompany.name)).toBeInTheDocument();
// 	expect(screen.getByText(firstCompany.description)).toBeInTheDocument();
// });
