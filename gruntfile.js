


'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    /* uglify js */

    uglify: {
      my_target: {
        files: {
          'dist/animator.min.js': 'dist/animator.js'
        }
      }
    },

    // Move other things around

    copy: {
      all: {
        files: [{
          expand: true,
          cwd: 'src/',
          dest: 'dist/',
          src: [
            'animator.js'
          ]
        }]
      }
    },

    watch: {
      scripts: {
        files: ['src/*.*','src/**/*.*','examples/*.*'],
        options: {
          livereload: true,
          reload: true
        }
      }
    },

    strip_code: {
      options: {
        // Task-specific options go here.
      },
      remove: {
        src : 'dist/animator.js'
      }
    }

  });


  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-strip-code');



  grunt.registerTask('default', ['copy','strip_code','uglify']);

};