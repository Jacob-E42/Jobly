import React, { useContext } from "react";
import UserContext from "../UserContext";

const Home = () => {
	const { currentUser } = useContext(UserContext);

	return (
		<div>
			<h1>Jobly</h1>
			<p>All the jobs, in one convenient place.</p>
			{currentUser && <h2>Welcome back {currentUser.firstName}!</h2>}
			{!currentUser && <h2>Welcome to Jobly!</h2>}
		</div>
	);
};

export default Home;
