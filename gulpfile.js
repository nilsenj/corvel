const gulp = require('gulp');
const ts = require('gulp-typescript');
const gulpTslint = require("gulp-tslint");
const tslint = require("tslint");
let browserSync = require('browser-sync');
// pull in the project TypeScript config
let nodemon = require('gulp-nodemon');
let bs = browserSync.create();
let cleanDest = require('gulp-clean-dest');
let file = require('gulp-file');
let del = require('del');
let task = require('gulp-task');
let run = require('run-sequence');
let watch = require('gulp-watch');
const tsProject = ts.createProject('tsconfig.json');

gulp.task('tslint', () => {
    let program = tslint.Linter.createProgram("./tsconfig.json");
    gulp.src('app/**/*.ts', {base: '.'})
        .pipe(gulpTslint({program}));
});

gulp.task('clean', () => {
    return del(["dist/**/*.js"]);
});

gulp.task('scriptTask', () => {
    let fs = require('fs');
    let extraFile = "dist/index.js";
    if (!fs.existsSync(extraFile)) {
        gulp.src('dist/**/*.js').pipe(file(extraFile, ""));
    }

    const tsResult = gulp.src("app/**/*.ts")
        .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('dist')).pipe(browserSync.stream());
});

// our browser-sync config + nodemon chain
gulp.task('browser-sync', () => {
    return bs.init(null, {
        proxy: "http://localhost:3000",
        port: 4000,
        open: true
    });
});

// give nodemon time to restart
gulp.task('reload', () => {
    setTimeout(function () {
        bs.reload({ stream: true });
    }, 1000);
});
let stream;
// our gulp-nodemon task
gulp.task('nodemon', (cb) => {
    let started = false;
     stream = nodemon({
        script: 'dist',
        ext: 'js',
        ignore: ['public/**/*.*'],
        tasks: [],
        env: {
            'NODE_ENV': 'development',
            'DEBUG': 'corvel:*'
        }
    });
    stream.on('start', () => {
        //avoid nodemon being started multiple times
        if (!started) {
            cb();
            started = true;
            gulp.start('browser-sync');
        }
        bs.reload();

    }).on('crash', () => {
        console.log('nodemon.crash');
        stream.emit('restart', 10);  // restart the server in 10 seconds
    })
        .on('restart', () => {
            console.log('nodemon.restart');
            bs.reload();
        })
        .once('quit', () => {
            // handle ctrl+c without a big weep
            process.exit();
            bs.exit();
        });
    return stream;
});
gulp.task('restart', function () {
    if (stream) {
        stream.emit('restart');
        bs.reload();
    }
});
// the real stuff
gulp.task('default', () => {
    run('clean', 'scriptTask', 'nodemon');
    let watcher = gulp.watch(['app/**/*.ts', 'app/*.ts', 'app/'], ['clean', 'scriptTask']);
    watcher.on('change', () => {});
    gulp.watch('dist/**/*.js',run('restart'));
});