var gulp = require("gulp");
var templateCache = require("gulp-angular-templatecache");
var ts = require("gulp-typescript");
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var livereload = require("gulp-livereload");
var uglify = require("gulp-uglify");

var files = [
    "typescript/Directives/*.ts",
    "typescript/Services/*.ts",
    "typescript/app.ts",
    "typescript/tstypings/*.d.ts"
    
];

gulp.task("typescript-dev", function() {
    console.log("Compiling Dev Typescript");
    console.log("Files: ", files);

    var tsresult = gulp.src(files)
        .pipe(sourcemaps.init())
        .pipe(ts({ module: "commonjs" }));

    return tsresult
            .js
            .pipe(concat("application.js"))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest("./wwwroot/js"))
            .pipe(livereload());
});

gulp.task("templatecache", function () {
    console.log("Creating an AgularJS $templateCache");

    return gulp
        .src("templates/**/*.tpl.html")
        .pipe(templateCache(
            "application.templates.js",
            {
                module: "nazarii.filebrowser"
            }
        ))
    .pipe(gulp.dest("./wwwroot/js"));
});

gulp.task("watch", function() {
    livereload.listen();
    gulp.watch(files.concat("templates/**/*.html").concat("wwwroot/css/*.css").concat("wwwroot/index.html"), ["typescript-dev", "templatecache"]);
});

gulp.task('default', function () {
    // place code for your default task here
});