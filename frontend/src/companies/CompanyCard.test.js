import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CompanyCard from "./CompanyCard";

test("CompanyCard renders without crashing", () => {
	render(
		<MemoryRouter>
			<CompanyCard />
		</MemoryRouter>
	);
});

test("CompanyCard matches snapshot", () => {
	const { asFragment } = render(
		<MemoryRouter>
			<CompanyCard />
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});

test("CompanyCard matches snapshot with name and description", () => {
	const { asFragment } = render(
		<MemoryRouter>
			<CompanyCard
				name="Test Co"
				desc="We provide tests"
			/>
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});

test("CompanyCard matches snapshot w/ name, desc and logo", () => {
	const { asFragment } = render(
		<MemoryRouter>
			<CompanyCard
				name="Test Co"
				desc="We provide tests"
				logo={"https://cdn.logo.com/hotlink-ok/logo-social.png"}
			/>
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});
