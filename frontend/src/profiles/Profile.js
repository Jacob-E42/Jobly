import React, { useContext, useState } from "react";
import UserContext from "../UserContext";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const Profile = () => {
	const { currentUser, updateCurrentUser } = useContext(UserContext);

	// State to store form data
	const [form, setForm] = useState({
		username: currentUser.username,
		firstName: currentUser.firstName,
		lastName: currentUser.lastName,
		email: currentUser.email,
		password: currentUser.password
	});

	// Handle input change
	const handleChange = event => {
		// Update the form state with the new input value
		setForm({
			...form,
			[event.target.name]: event.target.value
		});
		console.log(form);
	};

	// Handle form submission
	const handleSubmit = async event => {
		event.preventDefault();
		try {
			// Update the current user details
			await updateCurrentUser(form);
		} catch (error) {
			// Log any errors that occur during the update
			console.log(error);
		}
	};

	return (
		<div>
			{currentUser && (
				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Label for="firstName">First Name</Label>
						<Input
							type="text"
							name="firstName"
							id="firstName"
							value={form.firstName}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="lastName">Last Name</Label>
						<Input
							type="text"
							name="lastName"
							id="lastName"
							value={form.lastName}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="email">Email</Label>
						<Input
							type="email"
							name="email"
							id="email"
							value={form.email}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="password">Password</Label>
						<Input
							type="password"
							name="password"
							id="password"
							placeholder="Enter new password, if you want it changed"
							value={form.password}
							onChange={handleChange}
						/>
					</FormGroup>

					<Button type="submit">Submit</Button>
				</Form>
			)}
		</div>
	);
};

export default Profile;
