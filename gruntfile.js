


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
        files: ['src/*.*','src/**/*.*'],
        options: {
          livereload: true,
          reload: true
        }
      }
    }


  });


  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');



  grunt.registerTask('default', ['copy','uglify']);

};