import React from "react";
import { render } from "@testing-library/react";
import Alert from "./Alert";

test("Alert renders without crashing", () => {
	render(<Alert />);
});

test("Alert matches snapshot for success", () => {
	const { asFragment } = render(<Alert msg={"I did it!"} />);
	expect(asFragment()).toMatchSnapshot();
});

test("Alert matches snapshot for danger", () => {
	const { asFragment } = render(
		<Alert
			color="danger"
			msg="You did not enter the correct information"
		/>
	);
	expect(asFragment()).toMatchSnapshot();
});
