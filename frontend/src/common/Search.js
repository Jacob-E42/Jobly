import React, { useCallback, useState } from "react";
import { Form, Input, Button } from "reactstrap";

const Search = ({ searchFor }) => {
	const [searchTerm, setSearchTerm] = useState(null);

	const handleChange = useCallback(
		e => {
			e.preventDefault();
			setSearchTerm(e.target.value);
		},
		[searchTerm]
	);

	const handleSubmit = useCallback(
		e => {
			e.preventDefault();
			searchFor(searchTerm.trim() || undefined);
			setSearchTerm(searchTerm.trim());
		},
		[searchFor, setSearchTerm, searchTerm]
	);

	return (
		<Form onSubmit={handleSubmit}>
			<Input
				placeholder="Enter a Search Term..."
				id="searchTerm"
				name="searchTerm"
				type="text"
				value={searchTerm}
				onChange={handleChange}
			/>
			<Button type="submit">Submit</Button>
		</Form>
	);
};

export default Search;
