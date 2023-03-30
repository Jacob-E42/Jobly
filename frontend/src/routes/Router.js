import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../homepage/Home";
import CompanyList from "../companies/CompanyList";
import CompanyPage from "../companies/CompanyPage";
import JobsPage from "../jobs/JobList";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import Profile from "../profiles/Profile";
import Nav from "./Nav";

const Router = () => {
	// const [currentCompany, setCurrentCompany] = useState(null);

	return (
		<BrowserRouter>
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
					element={<CompanyList />}
				/>
				<Route
					exact
					path={"/companies/:handle"}
					element={<CompanyPage />}
				/>
				<Route
					exact
					path={"/jobs"}
					element={<JobsPage />}
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
		</BrowserRouter>
	);
};

export default Router;
