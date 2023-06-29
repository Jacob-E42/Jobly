import React from "react";
import { render } from "@testing-library/react";
import JobCardList from "./JobCardList";

test("JobCardList renders without crashing", () => {
	render(
		<JobCardList
			jobs={[
				{ salary: "20000", equity: ".1", title: "snowman" },
				{ salary: "30000", equity: "0", title: "rainman" },
				{ salary: "400000", equity: ".9", title: "corporate planner" }
			]}
		/>
	);
});

test("JobCardList matches snapshot", () => {
	const { asFragment } = render(
		<JobCardList
			jobs={[
				{ salary: "20000", equity: ".1", title: "snowman" },
				{ salary: "30000", equity: "0", title: "rainman" },
				{ salary: "400000", equity: ".9", title: "corporate planner" }
			]}
		/>
	);
	expect(asFragment()).toMatchSnapshot();
});

test("JobCardList matches snapshot without jobs", () => {
	const { asFragment } = render(<JobCardList />);
	expect(asFragment()).toMatchSnapshot();
});
