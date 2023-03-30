import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

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
		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${JoblyApi.token}` };
		const params = method === "get" ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error("API Error:", err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	// Individual API routes

	/** Get details on a company by handle. */

	static async register(username, password, firstName, lastName, email) {
		let res = await this.request(`auth/register`, { username, password, firstName, lastName, email }, "post");
		return res.token;
	}

	static async login(username, password) {
		let res = await this.request(`auth/token`, { username, password }, "post");
		return res.token;
	}

	static async createCompany(handle, name, description, numEmployees, logoUrl) {
		let res = await this.request(
			`companies/`,
			{ company: { handle, name, description, numEmployees, logoUrl } },
			"post"
		);
		return res.company;
	}

	static async getCompany(handle) {
		let res = await this.request(`companies/${handle}`);
		return res.company;
	}

	static async getCompanies(name) {
		let res = await this.request(`companies`, { name });
		return res.companies;
	}

	static async updateCompany(handle, fields) {
		let res = await this.request(`companies/${handle}`, fields, "patch");
		return res.company;
	}

	static async deleteCompany(handle) {
		let res = await this.request(`companies/${handle}`, "delete");
		return res;
	}

	static async createJob(title, salary, equity, companyHandle) {
		let res = await this.request(`jobs/`, { job: { title, salary, equity, companyHandle } }, "post");
		return res.job;
	}

	static async getAllJobs(filters = {}) {
		let res = await this.request(`jobs/`, filters);
		return res.jobs;
	}

	static async getJob(id) {
		let res = await this.request(`jobs/${id}`);
		return res.job;
	}

	static async updateJob(id, fields) {
		let res = await this.request(`jobs/${id}`, fields, "patch");
		return res.job;
	}

	static async deleteJob(id) {
		let res = await this.request(`jobs/${id}`, "delete");
		return res;
	}

	static async applyToJob(username, job_id) {
		let res = await this.request(`users/${username}/jobs/${job_id}`, "post");
		return res;
	}

	// obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
	"SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
	"FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
