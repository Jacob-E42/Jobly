import React, { useCallback, useState } from "react";
import { Form, Input, Button, InputGroup } from "reactstrap";
import "../companies/Companies.css";

const Search = ({ searchFor }) => {
	// State to store the search term
	const [searchTerm, setSearchTerm] = useState("");

	// Handle input change
	const handleChange = useCallback(
		e => {
			e.preventDefault();
			// Update the search term state with the new input value
			setSearchTerm(e.target.value);
		},
		[setSearchTerm]
	);

	// Handle form submission
	const handleSubmit = useCallback(
		e => {
			e.preventDefault();
			// Perform a search using the search term (trimmed) or undefined if empty
			searchFor(searchTerm.trim() || undefined);
			// Update the search term state with the trimmed value
			setSearchTerm(searchTerm.trim());
		},
		[searchFor, setSearchTerm, searchTerm]
	);

	return (
		<Form onSubmit={handleSubmit}>
			<InputGroup>
				<Input
					placeholder="Enter a Search Term..."
					id="searchTerm"
					name="searchTerm"
					type="text"
					value={searchTerm}
					onChange={handleChange}
				/>
				<Button
					type="submit"
					color="primary">
					Submit
				</Button>
			</InputGroup>
		</Form>
	);
};

export default Search;
