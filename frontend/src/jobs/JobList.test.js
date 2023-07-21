import React from "react";
import { render } from "@testing-library/react";
import { AlertProvider } from "../mock";
import JobList from "./JobList";

test("JobList renders without crashing", () => {
	render(
		<AlertProvider>
			<JobList />
		</AlertProvider>
	);
});

test("JobList matches snapshot", () => {
	const { asFragment } = render(
		<AlertProvider>
			<JobList />
		</AlertProvider>
	);
	expect(asFragment()).toMatchSnapshot();
});
