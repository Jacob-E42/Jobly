import React from "react";
import { render } from "@testing-library/react";
import JobList from "./JobList";

test("JobList renders without crashing", () => {
	render(<JobList />);
});

test("JobList matches snapshot", () => {
	const { asFragment } = render(<JobList />);
	expect(asFragment()).toMatchSnapshot();
});
