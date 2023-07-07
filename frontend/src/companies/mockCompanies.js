// mockJoblyApi.js
const companies = [
	{
		handle: "mejia-scott-ryan",
		name: "Mejia, Scott and Ryan",
		description: "General traditional late situation discussion dog. Before best up strategy about direction.",
		logo_url: "/logos/logo4.png"
	},
	{
		handle: "mueller-moore",
		name: "Mueller-Moore",
		numEmployees: 932,
		description: "Edge may report though least pressure likely. Cost short appear program hair seven.",
		logo_url: "/logos/logo2.png"
	},
	{
		handle: "pugh-ltd",
		name: "Pugh Ltd",
		numEmployees: 87,
		description: "Believe reflect perform TV son.",
		logo_url: "/logos/logo2.png"
	},
	{
		handle: "carr-wells-jones",
		name: "Carr, Wells and Jones",
		numEmployees: 27,
		description: "Human medical throw book pick possible. Maybe yeah word beat treatment impact campaign.",
		logo_url: "/logos/logo3.png"
	},
	{
		handle: "hall-mills",
		name: "Hall-Mills",
		numEmployees: 266,
		description: "Change stage tell note hundred. Worry where program wait.",
		logo_url: "/logos/logo3.png"
	}
];

const mockJoblyApi = {
	getAllCompanies: jest.fn(() => Promise.resolve(companies)),
	getCompanies: jest.fn(name => Promise.resolve(companies.filter(c => c.name.includes(name))))
};

export default mockJoblyApi;
