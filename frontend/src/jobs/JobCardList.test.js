import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserProvider, AnonUserProvider, ApplicationsProvider } from "../mock";
import JobCardList from "./JobCardList";

jest.mock("../api/api", () => ({
	login: jest.fn(() => Promise.resolve("mockToken"))
}));

test("JobCardList renders without crashing", () => {
	render(
		<MemoryRouter>
			<UserProvider>
				<ApplicationsProvider>
					<JobCardList
						jobs={[
							{ salary: "20000", equity: ".1", title: "snowman" },
							{ salary: "30000", equity: "0", title: "rainman" },
							{ salary: "400000", equity: ".9", title: "corporate planner" }
						]}
					/>
				</ApplicationsProvider>
			</UserProvider>
		</MemoryRouter>
	);
});

test("JobCardList matches snapshot", () => {
	const { asFragment } = render(
		<MemoryRouter>
			<UserProvider>
				<ApplicationsProvider>
					<JobCardList
						jobs={[
							{ salary: "20000", equity: ".1", title: "snowman" },
							{ salary: "30000", equity: "0", title: "rainman" },
							{ salary: "400000", equity: ".9", title: "corporate planner" }
						]}
					/>
				</ApplicationsProvider>
			</UserProvider>
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});

test("JobCardList matches snapshot without jobs", () => {
	const { asFragment } = render(
		<MemoryRouter>
			<UserProvider>
				<ApplicationsProvider>
					<JobCardList />
				</ApplicationsProvider>
			</UserProvider>
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});
