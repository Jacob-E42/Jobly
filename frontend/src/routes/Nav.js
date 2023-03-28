import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
	return (
		<nav className="Nav">
			<NavLink
				className="home"
				to="/">
				Jobly
			</NavLink>
			<NavLink to="/companies">Companies</NavLink>
			<NavLink to="/jobs">Jobs</NavLink>
			<NavLink to="/login">Login</NavLink>
			<NavLink to="/signup">Sign Up</NavLink>
			<NavLink>Log Out</NavLink>
		</nav>
	);
};

export default Nav;
