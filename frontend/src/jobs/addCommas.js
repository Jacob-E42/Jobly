//Write a function called addCommas which accepts a number and
//converts it into a string formatted with commas added for readability.

//Will not handle decimals properly

function addCommas(num) {
	if (!num) return;
	num = num.toString();

	//if there are 3 characters or less, no need to do anything else
	if (num.length < 4) return num;

	//how many commas need to be added
	const numOfCommas = Math.ceil(num.length / 3) - 1;

	//the final string to be returned
	let returnString = "";

	//per the number of commas needed, get the last 3 digits of the number,
	//add a comma to the front, add that to 'returnString', then chop those 3 digits
	// off of 'num'
	for (let i = 0; i < numOfCommas; i++) {
		let substring = num.slice(-3);
		returnString = "," + substring + returnString;
		num = num.slice(0, -3);
	}

	//adds back on, the first one or two or three characters that are left over in num
	returnString = num + returnString;

	return returnString;
}

export default addCommas;
