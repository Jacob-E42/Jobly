import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import "./Nav.css";

const Nav = () => {
	const { currentUser, logout } = useContext(UserContext);

	// Access the navigate function from react-router-dom
	const navigate = useNavigate();
	const handleLogout = async evt => {
		logout();
		navigate("/");
	};
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
					<NavLink to="/profile">{currentUser.username}</NavLink>
					<button
						className="link-button"
						onClick={handleLogout}>
						Log Out
					</button>
				</>
			)}
		</nav>
	);
};

export default Nav;
