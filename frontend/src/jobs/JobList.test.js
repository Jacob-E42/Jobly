import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { UserProvider, AlertProvider } from "../mock";
import JobList from "./JobList";
import AlertContext from "../context_providers/AlertContext";

test("JobList renders without crashing", () => {
	render();
});

test("JobList matches snapshot", () => {
	const { asFragment } = render(
		<AlertProvider>
			<JobList />
		</AlertProvider>
	);
	expect(asFragment()).toMatchSnapshot();
});
