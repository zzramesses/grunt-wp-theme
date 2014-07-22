module.exports = function( grunt ) {
	'use strict';

	// Load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration
	grunt.initConfig( {
		pkg:    grunt.file.readJSON( 'package.json' ),
		concat: {
			options: {
				stripBanners: true,
				banner: '/*! <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
					' * <%= pkg.homepage %>\n' +
					' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
					' * Licensed GPLv2+' +
					' */\n'
			},
			{%= js_safe_name %}: {
				src: [
					'assets/js/src/{%= js_safe_name %}.js'
				],
				dest: 'assets/js/{%= js_safe_name %}.js'
			}
		},
		jshint: {
			browser: {
				all: [
					'assets/js/src/**/*.js',
					'assets/js/test/**/*.js'
				],
				options: {
					jshintrc: '.jshintrc'
				}
			},
			grunt: {
				all: [
					'Gruntfile.js'
				],
				options: {
					jshintrc: '.gruntjshintrc'
				}
			}   
		},
		uglify: {
			all: {
				files: {
					'assets/js/{%= js_safe_name %}.min.js': ['assets/js/{%= js_safe_name %}.js']
				},
				options: {
					banner: '/*! <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
						' * <%= pkg.homepage %>\n' +
						' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
						' * Licensed GPLv2+' +
						' */\n',
					mangle: {
						except: ['jQuery']
					}
				}
			}
		},
		test:   {
			files: ['assets/js/test/**/*.js']
		},
		sass:   {
			all: {
				files: {
					'style.css': 'assets/sass/style.scss'
				}
			},
			options: {
				lineNumbers: true
			}
		},
		autoprefixer: {
			dist: {
				options: {
					browsers: [ 'last 1 version', '> 1%', 'ie 8' ]
				},
				files: ['style.css']
			}
		},
		cssmin: {
			options: {
				banner: "/*!\n" +
						" * Theme Name:  <%= pkg.title %>\n" +
						" * Theme URI:   <%= pkg.homepage %>\n" +
						" * Description: <%= pkg.description %>\n" +
						" * Author:      <%= pkg.author.name %>\n" +
						" * Author URI:  <%= pkg.author.url %>\n" +
						" * Version:     <%= pkg.version %>\n" +
						" * Tags:        <%  print( pkg.keywords.join(',') ); %>\n" +
						" * Compiled:    <%= grunt.template.today('yyyy-mm-dd') %>\n" +
						" *\n" +
						" * Copyright (c) <%= grunt.template.today('yyyy') %>\n" +
						" * License:     GPLv2+\n" +
						" * License URI: http://www.gnu.org/licenses/gpl-2.0.html\n" +
						" */\n"
			},
			minify: {
				expand: true,
				cwd: '',
				src: ['style.css'],
				dest: '',
				ext: '.css'
			}
		},
		watch:  {
			livereload: {
				files: ['assets/css/*.css'],
				options: {
					livereload: true
				}
			},
			sass: {
				files: ['assets/css/sass/*.scss'],
				tasks: ['sass', 'cssmin'],
				options: {
					debounceDelay: 500
				}
			},
			scripts: {
				files: ['assets/js/src/**/*.js', 'assets/js/vendor/**/*.js'],
				tasks: ['jshint', 'concat', 'uglify'],
				options: {
					debounceDelay: 500
				}
			}
		}
	} );

	// Default task.
	grunt.registerTask( 'default', ['jshint', 'concat', 'uglify', 'sass', 'autoprefixer', 'cssmin'] );

	grunt.util.linefeed = '\n';
	
	grunt.loadNpmTasks('grunt-contrib-watch');
};