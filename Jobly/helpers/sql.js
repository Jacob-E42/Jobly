const { BadRequestError } = require("../expressError");

/*
  Take data provided in an object and use it to return a SQL appropriate string 
  of specific columns to update in an UPDATE statement. 

  {firstName: "John", lastName: "Smith"} -> {setCols: `first_name=$1, last_name=$2`, values: ['John', 'Smith']}

  The jsToSql parameter is an object which has the names of JS keys and the value set to the proper SQL equivalent.
  Ex: {firstName: "first_name"}

  If provided, the setCols string will use the SQL equivalent strings
*/

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
	const keys = Object.keys(dataToUpdate);
	if (keys.length === 0) throw new BadRequestError("No data");

	// {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
	const cols = keys.map((colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`);

	return {
		setCols: cols.join(", "),
		values: Object.values(dataToUpdate)
	};
}

/*
    Take in an object of search filters and use them to create an arary of SQL Where expressions and and array of values.
    searchFilters is an object that should contain on or more of 3 fields: "name", "minEmployees" and/or "maxEmployees"

    The minEmployees filter can't be larger than maxEmployees.

    For each filter provided the value is added to the values array and the appropriate SQL statements is added to
    the array of where expressions.

    EX: {minEmployees: 6} --> {whereExpressions: [`WHERE num_employees >= $1`], values: [6]}
*/
function sqlForCompaniesFilters(searchFilters) {
	let whereExpressions = [];
	let queryValues = [];

	const { minEmployees, maxEmployees, name } = searchFilters;
	console.log(minEmployees, maxEmployees, name);

	if (minEmployees > maxEmployees) {
		throw new BadRequestError("Min employees cannot be greater than max");
	}

	// For each possible search term, add to whereExpressions and queryValues so
	// we can generate the right SQL

	// '!== undefined' is used because minEmployees might be equal to 0, which is falsy
	if (minEmployees !== undefined) {
		queryValues.push(minEmployees);
		whereExpressions.push(`num_employees >= $${queryValues.length}`);
	}

	if (maxEmployees !== undefined) {
		queryValues.push(maxEmployees);
		whereExpressions.push(`num_employees <= $${queryValues.length}`);
	}

	if (name) {
		queryValues.push(`%${name}%`);
		whereExpressions.push(`name ILIKE $${queryValues.length}`);
	}
	console.log(whereExpressions);
	return {
		whereExpressions,
		values: queryValues
	};
}

/*
    Take in an object of search filters and use them to create an arary of SQL 'Where' expressions and and array of values.
    searchFilters is an object that should contain on or more of 3 fields: "title", "minSalary" and/or "hasEquity"

    For each filter provided, other than hasEquity, the value is added to the values array and the appropriate SQL statements is added to
    the array of where expressions.

    EX: {minSalary: 1000} --> {whereExpressions: [`WHERE salary >= $1`], values: [1000]}
*/
function sqlForJobsFilters(searchFilters) {
	let whereExpressions = [];
	let queryValues = [];

	const { title, minSalary, hasEquity } = searchFilters;

	// For each possible search term, add to whereExpressions and queryValues so
	// we can generate the right SQL

	if (title !== undefined) {
		queryValues.push(`%${title}%`);
		whereExpressions.push(`title ILIKE $${queryValues.length}`);
	}

	if (minSalary !== undefined) {
		queryValues.push(minSalary);
		whereExpressions.push(`salary >=$${queryValues.length}`);
	}

	if (hasEquity !== undefined) {
		const hasEquityWhereExpression = hasEquity == "true" ? `equity !='0.0'` : `equity ='0.0'`;
		whereExpressions.push(hasEquityWhereExpression);
	}

	return {
		whereExpressions,
		values: queryValues
	};
}
module.exports = { sqlForPartialUpdate, sqlForCompaniesFilters, sqlForJobsFilters };
