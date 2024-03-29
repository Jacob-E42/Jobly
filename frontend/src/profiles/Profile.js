import React, { useCallback, useContext } from "react";
import UserContext from "../context_providers/UserContext";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./Profile.css";
import AlertContext from "../context_providers/AlertContext";
import useForm from "../hooks/useForm";

const Profile = () => {
	const { currentUser, updateCurrentUser } = useContext(UserContext);
	const { setMsg, setColor } = useContext(AlertContext);

	// State to store form data
	const [form, handleChange] = useForm({
		username: currentUser.username,
		firstName: currentUser.firstName,
		lastName: currentUser.lastName,
		email: currentUser.email,
		password: currentUser.password
	});

	// Handle form submission
	const handleSubmit = useCallback(
		async event => {
			event.preventDefault();
			try {
				// Update the current user details
				await updateCurrentUser(form);
				setMsg("Your information has been updated");
				setColor("success");
			} catch (error) {
				// Log any errors that occur during the update
				console.error(error);
			}
		},
		[updateCurrentUser, setMsg, setColor, form]
	);

	return (
		<>
			{currentUser && (
				<Form
					onSubmit={handleSubmit}
					className="profile-container">
					<FormGroup className="profile-item">
						<Label for="firstName">First Name</Label>
						<Input
							type="text"
							name="firstName"
							id="firstName"
							value={form.firstName}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup className="profile-item">
						<Label for="lastName">Last Name</Label>
						<Input
							type="text"
							name="lastName"
							id="lastName"
							value={form.lastName}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup className="profile-item">
						<Label for="email">Email</Label>
						<Input
							type="email"
							name="email"
							id="email"
							value={form.email}
							onChange={handleChange}
						/>
					</FormGroup>
					<FormGroup className="profile-item">
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

					<Button
						type="submit"
						color="primary">
						Submit
					</Button>
				</Form>
			)}
		</>
	);
};

export default Profile;
