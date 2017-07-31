var gulp = require('gulp'),
    image = require('gulp-image'),
    plumber = require('gulp-plumber');

// source and distribution folder
var source = 'src/',
    dest = 'dist/';

// Backup
var backup = {
    in: source + 'images/**/*',
    out: dest + 'images-backup_'
};
var myVDate = new Date().getTime();

// Images
var images = {
  in: source + 'images/**/*',
  out: dest + 'images-optimized/'
};
// Options plugin image
var optionsImage = {
    pngquant: true,
    optipng: true,
    zopflipng: false,
    jpegRecompress: false,
    jpegoptim: true,
    mozjpeg: true,
    gifsicle: false,
    svgo: true,
    concurrent: 10
};

// Copy lib
var copyLibs = {
  in: source + 'images/**/*',
  out: dest + 'images/'
};

gulp.task('backup', function(){
    gulp.src(backup.in)
        .pipe(gulp.dest(backup.out + myVDate + '/'));
});

gulp.task('images-optimize', function () {
    return gulp
        .src(images.in)
        .pipe(image(optionsImage))
        .pipe(plumber({
            handleError: function (error) {
                console.log(error);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest(images.out));
});

// default task
gulp.task('default', ['backup', 'images-optimize']);
