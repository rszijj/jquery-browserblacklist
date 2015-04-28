module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("package.json"),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.license %> License\n" +
				" */\n"
		},

		// Concat definitions
		concat: {
			options: {
				banner: "<%= meta.banner %>"
			},
			dist: {
				src: ["src/jquery.browserblacklist.js"],
				dest: "dist/jquery.browserblacklist.js"
			}
		},

		// Minify definitions
		uglify: {
			my_target: {
				src: ["dist/jquery.browserblacklist.js"],
				dest: "dist/jquery.browserblacklist.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.registerTask("build", ["concat", "uglify"]);
	grunt.registerTask("default", ["build"]);
	grunt.registerTask("travis", ["default"]);

};