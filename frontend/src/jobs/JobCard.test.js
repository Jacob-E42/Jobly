import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import JobCard from "./JobCard";

test("JobCard renders without crashing", () => {
	render(
		<MemoryRouter>
			<JobCard job={{ salary: "20000", equity: ".1", title: "snowman" }} />
		</MemoryRouter>
	);
});

test("JobCard matches snapshot", () => {
	const { asFragment } = render(
		<MemoryRouter>
			<JobCard job={{ salary: "20000", equity: ".1", title: "snowman" }} />
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});

test("JobCard matches snapshot without job", () => {
	const { asFragment } = render(
		<MemoryRouter>
			<JobCard />
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});
