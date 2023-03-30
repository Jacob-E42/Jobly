import React from "react";
import { render } from "@testing-library/react";
import JobCard from "./JobCard";

test("JobCard renders without crashing", () => {
	render(<JobCard />);
});

test("JobCard matches snapshot", () => {
	const { asFragment } = render(<JobCard />);
	expect(asFragment()).toMatchSnapshot();
});
