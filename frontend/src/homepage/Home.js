import React, { useContext } from "react";
import UserContext from "../UserContext";

const Home = () => {
	const { currentUser } = useContext(UserContext);

	return (
		<div>
			{currentUser && <p>Welcome back {currentUser.firstName}!</p>}
			{!currentUser && <p>Welcome to Jobly!</p>}
		</div>
	);
};

export default Home;
