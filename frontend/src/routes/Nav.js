import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../UserContext";
import "./Nav.css";

const Nav = () => {
	const { currentUser } = useContext(UserContext);
	return (
		<nav className="Nav">
			<NavLink
				className="home"
				to="/">
				Jobly
			</NavLink>
			<NavLink to="/companies">Companies</NavLink>
			<NavLink to="/jobs">Jobs</NavLink>
			{!currentUser && (
				<>
					<NavLink to="/login">Login</NavLink>
					<NavLink to="/signup">Sign Up</NavLink>
				</>
			)}

			{currentUser && (
				<>
					<span>{currentUser.username}</span>
					<NavLink>Log Out</NavLink>
				</>
			)}
		</nav>
	);
};

export default Nav;
