import React, { useContext } from "react";
import UserContext from "../UserContext";

const Profile = () => {
	const { currentUser } = useContext(UserContext);
	return (
		<div>
			{currentUser && (
				<div>
					<span>Username: {currentUser.username}</span>
					<span>first Name: {currentUser.firstName}</span>
					<span>Last Name: {currentUser.lastName}</span>
					<span>Email: {currentUser.email}</span>
					<span>Admin: {currentUser.isAdmin}</span>
					<span>Applications: {currentUser.applications}</span>
				</div>
			)}
		</div>
	);
};

export default Profile;
