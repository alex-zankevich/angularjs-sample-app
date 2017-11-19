export default function($sce) {
	'ngInject';
	const MAX_HEADING_LEVEL = 6;

	function replaceHeading(line) {
		let headingLevel;
		const match = line.trim().match(new RegExp(`^#{1,${MAX_HEADING_LEVEL}}(?!#)`));

		if (match) {
			headingLevel = match[0].length;
			line = line.replace(new RegExp(`^\\s*#{${headingLevel}}\\s*`), '');

			return `<h${headingLevel}>${line}</h${headingLevel}>`;
		}

		return line;
	}

	function replaceHeadings(input) {
		return input
			.split('\n')
			.map(replaceHeading)
			.join('\n');
	}

	function replaceNewLines(input) {
		return input.replace(/\n+?/g, '<br>');
	}

	function transformInput(input) {
		return replaceNewLines(replaceHeadings(input));
	}

	return function(input) {
		return $sce.trustAsHtml(transformInput(input));
	}
}