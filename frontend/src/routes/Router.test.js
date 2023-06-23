import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testMock";
import Router from "./Router";

test("Router renders without crashing", () => {
	render(
		<MemoryRouter>
			<UserProvider>
				<Router />
			</UserProvider>
		</MemoryRouter>
	);
});

test("Router matches snapshot", () => {
	const { asFragment } = render(
		<MemoryRouter>
			<UserProvider>
				<Router />
			</UserProvider>
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});
