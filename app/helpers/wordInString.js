export const wordInString = (string, word) => {
	const regexResult = new RegExp( '\\b' + word + '\\b', 'i').test(string)
	const indexOfResult = string.indexOf(word) > -1
	return regexResult || indexOfResult
}

export default wordInString