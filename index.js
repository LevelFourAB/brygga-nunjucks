/**
 * Nunjucks plugin for Brygga. Registers a single HTML tasks.
 */

var brygga = require('brygga');

var nunjucks = require('gulp-nunjucks-render');
var data = require('gulp-data');
var gm = require('gray-matter');

module.exports.tasks = [
	{
		task: 'html',
		description: 'Generate HTML from sources and templates'
	}
];

module.exports.config = {
	/**
	 * HTML defaults, looks under the pages folder for files.
	 */
	html: {
		root: '',

		src: [ 'pages/**/*.html' ],

		templates: [ '' ],

		watch: [ '**/*.html' ],

		dest: '',

		buildStep: 'pages'
	}
};

var loadData = function(file, cb) {
	var parsed = gm(String(file.contents));
	file.contents = new Buffer(parsed.content);
	brygga.data.loadAll(parsed.data, cb);
};

brygga.utils.task('html', function() {
	nunjucks.nunjucks.configure(brygga.utils.glob('html', 'templates'), { watch: false });
	return brygga.utils.srcFor('html')
		.pipe(data(loadData))
		.pipe(nunjucks())
		.pipe(brygga.utils.destFor('html'))
		.pipe(brygga.utils.reloadBrowser());
});
