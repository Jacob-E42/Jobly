import React from "react";
import { render } from "@testing-library/react";
import LoginForm from "./LoginForm";

test("LoginForm renders without crashing", () => {
	render(<LoginForm />);
});

test("LoginForm matches snapshot", () => {
	const { asFragment } = render(<LoginForm />);
	expect(asFragment()).toMatchSnapshot();
});
