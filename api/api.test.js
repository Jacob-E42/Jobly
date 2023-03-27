import JoblyApi from "./api";

test("register method", async () => {
	const token = JoblyApi.register("usertest", "password", "John", "test", "johntest@fake.com");
	expect(typeof token).toBe(String);
	expect(token.length).toBeGreaterThan(20);
});
