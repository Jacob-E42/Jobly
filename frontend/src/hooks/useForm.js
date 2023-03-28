import { useState, useCallback } from "react";

const useForm = (initialState = {}) => {
	const [form, setForm] = useState(initialState);

	const handleChange = useCallback(e => {
		e.preventDefault();
		const { name, value } = e.target;
		setForm(form => ({
			...form,
			[name]: value
		}));
	}, []);

	return [form, handleChange];
};

export default useForm;
