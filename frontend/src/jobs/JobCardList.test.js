import React from "react";
import { render } from "@testing-library/react";
import JobCardList from "./JobCardList";

test("JobCardList renders without crashing", () => {
	render(<JobCardList />);
});

test("JobCardList matches snapshot", () => {
	const { asFragment } = render(<JobCardList />);
	expect(asFragment()).toMatchSnapshot();
});
