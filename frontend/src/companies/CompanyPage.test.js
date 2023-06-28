import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "../testMock";
import CompanyPage from "./CompanyPage";

test("CompanyPage renders without crashing", () => {
	render(
		<MemoryRouter>
			<UserProvider>
				<CompanyPage />
			</UserProvider>
		</MemoryRouter>
	);
});

test("CompanyPage matches snapshot", () => {
	const { asFragment } = render(
		<MemoryRouter initialEntries={["/company/ibm"]}>
			<UserProvider>
				<Routes>
					<Route
						path="/company/:handle"
						element={<CompanyPage />}
					/>
				</Routes>
			</UserProvider>
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});
