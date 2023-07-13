import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const NODE_ENV = process.env.NODE_ENV || "development";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
	// the token for interacting with the API will be stored here.
	static token;

	static async request(endpoint, data = {}, method = "get") {
		console.debug("API Call:", endpoint, data, method);

		//there are multiple ways to pass an authorization token, this is how you pass it in the header.
		//this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
		const url = NODE_ENV === "production" ? `${BASE_URL}${endpoint}` : `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${JoblyApi.token}` };
		const params = method === "get" ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error("API Error:", err.response);
			let message;
			if (err.response) message = err.response.data.error.message;
			else message = err;

			throw Array.isArray(message) ? message : [message];
		}
	}

	// Individual API routes

	// Register a new user with the provided username, password, first name, last name, and email
	static async register(username, password, firstName, lastName, email) {
		let res = await this.request(`auth/register`, { username, password, firstName, lastName, email }, "post");
		return res.token;
	}

	// Log in a user with the provided username and password
	static async login(username, password) {
		let res = await this.request(`auth/token`, { username, password }, "post");
		return res.token;
	}

	// Get the current user's information based on the provided username
	static async getCurrentUser(username) {
		let res = await this.request(`users/${username}`);
		return res.user;
	}

	// Get the current user's information based on the provided username
	static async editCurrentUser(username, data) {
		console.debug("editCurrentUser", username, data);
		let res = await this.request(`users/${username}`, data, "patch");
		return res.user;
	}

	// Create a new company with the provided handle, name, description, number of employees, and logo URL
	static async createCompany(handle, name, description, numEmployees, logoUrl) {
		let res = await this.request(
			`companies/`,
			{ company: { handle, name, description, numEmployees, logoUrl } },
			"post"
		);
		return res.company;
	}

	// Get information about a specific company based on the provided handle
	static async getCompany(handle) {
		let res = await this.request(`companies/${handle}`);
		return res.company;
	}

	// Get a list of companies with names matching the provided value
	static async getCompanies(name) {
		let res = await this.request(`companies`, { name });
		console.log(res.companies);
		return res.companies;
	}

	//Get all companies
	static async getAllCompanies() {
		let res = await this.request("companies");
		console.log(res.companies);
		return res.companies;
	}

	// Update a company with the provided handle using the provided fields
	static async updateCompany(handle, fields) {
		let res = await this.request(`companies/${handle}`, fields, "patch");
		return res.company;
	}

	// Delete a company with the provided handle
	static async deleteCompany(handle) {
		let res = await this.request(`companies/${handle}`, "delete");
		return res;
	}

	// Create a new job with the provided title, salary, equity, and company handle
	static async createJob(title, salary, equity, companyHandle) {
		let res = await this.request(`jobs/`, { job: { title, salary, equity, companyHandle } }, "post");
		return res.job;
	}

	// Get a list of jobs with titles matching the provided value
	static async getJobs(title) {
		let res = await this.request(`jobs`, { title });
		return res.jobs;
	}

	// Get information about a specific job based on the provided ID
	static async getJob(id) {
		let res = await this.request(`jobs/${id}`);
		return res.job;
	}

	// Update a job with the provided ID using the provided fields
	static async updateJob(id, fields) {
		let res = await this.request(`jobs/${id}`, fields, "patch");
		return res.job;
	}

	// Delete a job with the provided ID
	static async deleteJob(id) {
		let res = await this.request(`jobs/${id}`, "delete");
		return res;
	}

	// Apply to a job with the provided username and job ID
	static async applyToJob(username, job_id) {
		let res = await this.request(`users/${username}/jobs/${job_id}`, { username, job_id }, "post");
		return res;
	}
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "";

export default JoblyApi;
