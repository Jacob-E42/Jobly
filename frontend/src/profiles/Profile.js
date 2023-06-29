import React, { useContext } from "react";
import UserContext from "../UserContext";

const Profile = () => {
	const { currentUser } = useContext(UserContext);
	return (
		<div>
			{currentUser && (
				<div>
					<p>Username: {currentUser.username}</p>
					<p>first Name: {currentUser.firstName}</p>
					<p>Last Name: {currentUser.lastName}</p>
					<p>Email: {currentUser.email}</p>
					<p>Admin: {currentUser.isAdmin}</p>
					<p>Applications: {currentUser.applications}</p>
				</div>
			)}
		</div>
	);
};

export default Profile;
