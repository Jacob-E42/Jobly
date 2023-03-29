import React, { useCallback } from "react";
import { Form, Input, Button } from "reactstrap";
import useForm from "../hooks/useForm";

const Search = ({ allowedTerms }) => {
	const [form, handleChange] = useForm({ searchTerm: "" });
	const handleSubmit = useCallback(e => {
		e.preventDefault();
	}, []);
	return (
		<Form onSubmit={handleSubmit}>
			<Input
				placeholder="Enter a Search Term..."
				id="searchTerm"
				name="searchTerm"
				type="text"
				value={form.searchTerm}
				onChange={handleChange}
			/>
			<Button type="submit">Submit</Button>
		</Form>
	);
};

export default Search;
