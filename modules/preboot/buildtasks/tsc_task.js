var gulp = require('gulp');
var size = require('gulp-size');
var typescript = require('gulp-typescript');
var path = require('path');

module.exports = function (opts) {
  gulp.task('tsc', [ 'clean' ], function () {
    var tsConfig = path.join(opts.rootDir, 'tsconfig.json');
    var tsProject = typescript.createProject(tsConfig, {
      declaration: true
    });

    // return gulp.src(path.join(opts.rootDir, 'src/inline/preboot_inline.ts')).
    //   pipe(typescript({
    //     target: 'es5',
    //     module: 'commonjs',
    //     outFile: 'preboot_inline.js'
    //   })).
    //   pipe(size()).
    //   pipe(gulp.dest(path.join(opts.rootDir, 'dist/')));

    return tsProject.src().
      pipe(typescript(tsProject)).
      pipe(size()).
      pipe(gulp.dest(tsProject.config.compilerOptions.outDir));
  });
};
