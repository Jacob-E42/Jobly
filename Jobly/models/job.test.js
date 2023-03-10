"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Job = require("./job.js");
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll } = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
	const newJob = {
		title: "New Job",
		salary: 50000,
		equity: "0.0",
		companyHandle: "c1"
	};

	test("works", async function () {
		let job = await Job.create(newJob);
		expect(job).toMatchObject(newJob);

		const result = await db.query(
			`SELECT id, title, salary, equity, company_handle AS "companyHandle"
           FROM jobs
           WHERE title = 'New Job'`
		);
		expect(result.rows).toEqual([{ id: expect.any(Number), title: "New Job", salary: 50000, equity: "0.0", companyHandle: "c1" }]);
	});

	test("bad request with dupe", async function () {
		try {
			await Job.create(newJob);
			await Job.create(newJob);
			fail();
		} catch (err) {
			expect(err instanceof BadRequestError).toBeTruthy();
		}
	});
});

/************************************** findAll */

describe("findAll", function () {
	test("works: no filter", async function () {
		let jobs = await Job.findAll();
		expect(jobs).toEqual([
			{ id: expect.any(Number), title: "job1", salary: 50000, equity: "0.5", companyHandle: "c1" },
			{ id: expect.any(Number), title: "job2", salary: 10000, equity: "0.2", companyHandle: "c2" },
			{ id: expect.any(Number), title: "job3", salary: 100000, equity: "0.0", companyHandle: "c3" }
		]);
	});
	// test("works: with filter", async function () {
	// 	let jobs = await Job.findAll({ title: "job1" });
	// 	expect(jobs).toEqual([
	// 		{
	// 			handle: "c1",
	// 			name: "C1",
	// 			description: "Desc1",
	// 			numEmployees: 1,
	// 			logoUrl: "http://c1.img"
	// 		}
	// 	]);
	// 	//there should be 3 here
	// 	companies = await Company.findAll({ minEmployees: 2 });
	// 	expect(companies).toEqual([
	// 		{
	// 			handle: "c2",
	// 			name: "C2",
	// 			description: "Desc2",
	// 			numEmployees: 2,
	// 			logoUrl: "http://c2.img"
	// 		},
	// 		{
	// 			handle: "c3",
	// 			name: "C3",
	// 			description: "Desc3",
	// 			numEmployees: 3,
	// 			logoUrl: "http://c3.img"
	// 		},
	// 		{ handle: "c4", name: "Company1", numEmployees: 10, description: "Desc4", logoUrl: "http://c1.img" }
	// 	]);
	// 	companies = await Company.findAll({ name: "C", maxEmployees: 2 });
	// 	expect(companies).toEqual([
	// 		{
	// 			handle: "c1",
	// 			name: "C1",
	// 			description: "Desc1",
	// 			numEmployees: 1,
	// 			logoUrl: "http://c1.img"
	// 		},
	// 		{
	// 			handle: "c2",
	// 			name: "C2",
	// 			description: "Desc2",
	// 			numEmployees: 2,
	// 			logoUrl: "http://c2.img"
	// 		}
	// 	]);
	// });
});

/************************************** get */

describe("get", function () {
	test("works", async function () {
		let job = await Job.get(1);
		expect(job).toEqual({ id: 1, title: "job1", salary: 50000, equity: "0.5", companyHandle: "c1" });
	});

	test("not found if no such job", async function () {
		try {
			await Job.get(-5);
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});

/************************************** update */

describe("update", function () {
	const updateData = {
		title: "New Job title",
		salary: 10,
		equity: "0.7"
	};

	test("works", async function () {
		let job = await Job.update(1, updateData);
		expect(job).toEqual({
			id: 1,
			...updateData,
			companyHandle: "c1"
		});

		const result = await db.query(
			`SELECT id, title, salary, equity, company_handle AS "companyHandle"
           FROM jobs
           WHERE id = 1`
		);
		expect(result.rows).toEqual([{ id: 1, title: "New Job title", salary: 10, equity: "0.7", companyHandle: "c1" }]);
	});

	test("works: null fields", async function () {
		const updateDataSetNulls = {
			title: "New Title",
			salary: null,
			equity: null
		};

		let job = await Job.update(1, updateDataSetNulls);
		expect(job).toEqual({
			id: 1,
			...updateDataSetNulls,
			companyHandle: "c1"
		});

		const result = await db.query(
			`SELECT id, title, salary, equity, company_handle AS "companyHandle"
           FROM jobs
           WHERE id = 1`
		);
		expect(result.rows).toEqual([{ id: 1, title: "New Title", salary: null, equity: null, companyHandle: "c1" }]);
	});

	test("not found if no such job", async function () {
		try {
			await Job.update(0, updateData);
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});

	test("bad request with no data", async function () {
		try {
			await Job.update(1, {});
			fail();
		} catch (err) {
			expect(err instanceof BadRequestError).toBeTruthy();
		}
	});
});

/************************************** remove */

describe("remove", function () {
	test("works", async function () {
		await Job.remove(1);
		const res = await db.query("SELECT id FROM jobs WHERE id=1");
		expect(res.rows.length).toEqual(0);
	});

	test("not found if no such company", async function () {
		try {
			await Job.remove(0);
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});
