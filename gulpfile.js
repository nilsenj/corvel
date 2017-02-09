const gulp = require('gulp');
const ts = require('gulp-typescript');
const gulpTslint = require("gulp-tslint");
const tslint = require("tslint");
let browserSync = require('browser-sync');
// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');
let nodemon = require('gulp-nodemon');
let bs = browserSync.create();
let cleanDest = require('gulp-clean-dest');

// NOTE: Ensure 'Linter.createProgram' is called inside the gulp task else the contents of the files will be cached
// if this tasks is called again (eg. as part of a 'watch' task).
gulp.task('tslint', function () {
    let program = tslint.Linter.createProgram("./tsconfig.json");

    gulp.src('src/**/*.ts', {base: '.'})
        .pipe(gulpTslint({program}));
});

gulp.task('scriptTask', function () {
    const tsResult = tsProject.src()
        .pipe(cleanDest('dist'))
        .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('dist')).pipe(browserSync.stream());
});

// our browser-sync config + nodemon chain
gulp.task('browser-sync', ['nodemon'], function () {
    return bs.init(null, {
        proxy: "http://localhost:3000",
        port: 4000,
        open: false
    });
});

// give nodemon time to restart
gulp.task('reload', function () {
    setTimeout(function () {
        bs.reload({ stream: true });
    }, 1000);
});

// our gulp-nodemon task
gulp.task('nodemon', function (cb) {
    let started = false;
    const stream = nodemon({
        script: './dist',
        ext: 'js',
        ignore: ['public/**/*.*'],
        tasks: [],
        env: {
            'NODE_ENV': 'development',
            'DEBUG': 'itway.blog:*'
        }
    });
    stream.on('start', function () {
        //avoid nodemon being started multiple times
        if (!started) {
            cb();
            started = true;
        }
        bs.reload({ stream: true });

    }).on('crash', function () {
            console.log('nodemon.crash');
            stream.emit('restart', 10);  // restart the server in 10 seconds
        })
        .on('restart', function () {
            console.log('nodemon.restart');
        })
        .once('quit', function () {
            // handle ctrl+c without a big weep
            process.exit();
        });
    return stream;
});

// the real stuff
gulp.task('default', ['scriptTask', 'browser-sync'], function () {
    gulp.watch('./src/**/*.ts', ['scriptTask']);
    gulp.watch('./dist/**/*.js').on('change', () => bs.reload());
});