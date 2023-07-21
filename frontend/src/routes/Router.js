import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../homepage/Home";
import CompanyList from "../companies/CompanyList";
import CompanyPage from "../companies/CompanyPage";
import JobList from "../jobs/JobList";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import Profile from "../profiles/Profile";
import Nav from "./Nav";
import AlertExample from "../common/Alert";
import UserContext from "../context_providers/UserContext";
import AlertContext from "../context_providers/AlertContext";

const ProtectedRoute = ({ children }) => {
	const { currentUser } = useContext(UserContext);
	const { setMsg, setColor } = useContext(AlertContext);

	console.log(currentUser);

	if (currentUser) return children;
	else {
		setColor("danger");
		setMsg("You must be logged in to access this page.");
		return (
			<>
				<Navigate
					to="/login"
					replace={true}
				/>
			</>
		);
	}
};

const RouterComponent = () => {
	const { msg, color } = useContext(AlertContext);
	console.debug("msg", msg, "color:", color);

	return (
		<>
			<Nav />
			{msg && (
				<AlertExample
					msg={msg}
					color={color}
				/>
			)}
			<Routes className="pt-5">
				<Route
					exact
					path={"/"}
					element={<Home />}
				/>
				<Route
					exact
					path={"/companies"}
					element={
						<ProtectedRoute>
							<CompanyList />
						</ProtectedRoute>
					}
				/>
				<Route
					exact
					path={"/companies/:handle"}
					element={
						<ProtectedRoute>
							<CompanyPage />
						</ProtectedRoute>
					}
				/>
				<Route
					exact
					path={"/jobs"}
					element={
						<ProtectedRoute>
							<JobList />
						</ProtectedRoute>
					}
				/>

				<Route
					exact
					path={"/login"}
					element={<LoginForm />}
				/>
				<Route
					exact
					path={"/signup"}
					element={<SignupForm />}
				/>
				<Route
					exact
					path={"/profile"}
					element={<Profile />}
				/>
			</Routes>
		</>
	);
};

export default RouterComponent;
