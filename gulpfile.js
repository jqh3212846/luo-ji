var gulp = require('gulp')
var sass = require('gulp-sass')
var minifyCss = require('gulp-minify-css')
var rename = require('gulp-rename')
var browser = require('browser-sync')
var watch = require('gulp-watch')
var minifyHtml = require('gulp-minify-html')
var uglify = require('gulp-uglify')
var babel = require('gulp-babel')

gulp.task('js',function(done){
    gulp.src('./old/js/*.js')
    .pipe(babel({
		'presets':['@babel/env']
	}))
    .pipe(uglify())
    .pipe(gulp.dest('./Extracted files/js/'))
    done()
})

gulp.task('css',function(done){
    gulp.src('./old/scss/*.scss')
    .pipe(sass())
    .pipe(minifyCss())
    .pipe(gulp.dest('./Extracted files/css/'))
    done()
})

gulp.task('html',function(done){
    gulp.src('./old/*.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest('./Extracted files/'))
    done()
})

gulp.task('save',gulp.series(gulp.parallel('html','css','js'),function(done){
    browser.reload()
    done()
}))

gulp.task('server',gulp.series(gulp.parallel('html','css','js'),function(done){
    browser.init({
        server:'./Extracted files',
        port:8080
    })
    gulp.watch('./old/',gulp.series('save'))
    done()
}))




// gulp.task('a',function(done){
//     gulp.src('./old/scss/login.scss')
//     .pipe(sass())
//     .pipe(minifyCss())
//     .pipe(rename('login.css'))
//     .pipe(gulp.dest('./Extracted files/css/'))
//     done()
// })

// gulp.task('b',function(done){
//     gulp.src('./old/login.html')
//     .pipe(minifyHtml())
//     .pipe(gulp.dest('./Extracted files/'))
//     done()
// })

// gulp.task('c',gulp.series(gulp.parallel('b','a'),function(done){
//     browser.reload()
//     done()
// }))

// gulp.task('login',gulp.series(gulp.parallel('b','a'),function(done){
//     browser.init({
//         server:'./Extracted files',
//         port:8080
//     })
//     gulp.watch('./old/',gulp.series('c'))
//     done()
// }))