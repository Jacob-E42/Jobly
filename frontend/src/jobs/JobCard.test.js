import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AlertProvider, ApplicationsProvider, UserProvider } from "../mock";
import JobCard from "./JobCard";

test("JobCard renders without crashing", () => {
	render(
		<MemoryRouter>
			<UserProvider>
				<ApplicationsProvider>
					<AlertProvider>
						<JobCard job={{ salary: "20000", equity: ".1", title: "snowman", id: 1 }} />
					</AlertProvider>
				</ApplicationsProvider>
			</UserProvider>
		</MemoryRouter>
	);
});

test("JobCard matches snapshot", () => {
	const { asFragment } = render(
		<MemoryRouter>
			<UserProvider>
				<ApplicationsProvider>
					<AlertProvider>
						<JobCard job={{ salary: "20000", equity: ".1", title: "snowman", id: 1 }} />
					</AlertProvider>
				</ApplicationsProvider>
			</UserProvider>
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});

test("JobCard throws an error when job prop is missing", () => {
	const renderJobCard = () =>
		render(
			<MemoryRouter>
				<UserProvider>
					<ApplicationsProvider>
						<AlertProvider>
							<JobCard />
						</AlertProvider>
					</ApplicationsProvider>
				</UserProvider>
			</MemoryRouter>
		);

	expect(renderJobCard).toThrowErrorMatchingSnapshot();
});
