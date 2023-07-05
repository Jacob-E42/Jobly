import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../homepage/Home";
import CompanyList from "../companies/CompanyList";
import CompanyPage from "../companies/CompanyPage";
import JobsPage from "../jobs/JobList";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import Profile from "../profiles/Profile";
import Nav from "./Nav";
import Alert from "../common/Alert";
import UserContext from "../UserContext";

const Router = () => {
	const ProtectedRoute = ({ children }) => {
		const { currentUser } = useContext(UserContext);

		if (currentUser) return children;
		else {
			return (
				<>
					<Navigate
						to="/login"
						replace={true}
					/>
					<Alert
						msg="You need to be logged in to access this page"
						color="failure"
					/>
				</>
			);
		}
	};

	return (
		<>
			<Nav />
			<Routes>
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
							<JobsPage />
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

export default Router;
