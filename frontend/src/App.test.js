import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
	render(<App />);
	const linkElement = screen.getByText(/learn react/i);
	expect(linkElement).toBeInTheDocument();
});

test("App renders without crashing", () => {
	render(<App />);
});

test("App matches snapshot", () => {
	const { asFragment } = render(<App />);
	expect(asFragment()).toMatchSnapshot();
});
