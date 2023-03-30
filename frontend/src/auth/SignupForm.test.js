import React from "react";
import { render } from "@testing-library/react";
import SignupForm from "./SignupForm";

test("SignupForm renders without crashing", () => {
	render(<SignupForm />);
});

test("SignupForm matches snapshot", () => {
	const { asFragment } = render(<SignupForm />);
	expect(asFragment()).toMatchSnapshot();
});
