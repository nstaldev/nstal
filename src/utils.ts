
// See https://github.com/sindresorhus/detect-newline/blob/main/index.js
export const detectNewline = (str: string): string => {
	const newlines = str.match(/(?:\r?\n)/g) || [];

	if (newlines.length === 0) {
		return require('os').EOL;
	}

	const crlf = newlines.filter(newline => newline === '\r\n').length;
	const lf = newlines.length - crlf;

	return crlf > lf ? '\r\n' : '\n';
}
