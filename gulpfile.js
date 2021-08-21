const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();

const htmlmin = require("gulp-htmlmin");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const svgstore = require("gulp-svgstore");
const terser = require("gulp-terser");
const squoosh = require("gulp-libsquoosh");
const webp = require("gulp-webp");
const avif = require("gulp-avif");
const del = require("del");


// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// HTML

const html = () => {
  return gulp.src("source/*.html")
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest("build"));
}

// Scripts

const scripts = () => {
  return gulp.src("source/js/script.js")
  .pipe(terser())
  .pipe(rename("script.min.js"))
  .pipe(gulp.dest("build/js"));
}

exports.scripts = scripts;

// Images

const optimizeImages = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
  .pipe(squoosh())
  .pipe(gulp.dest("build/img"));
}

exports.optimizeImages = optimizeImages;

const copyImages = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
  .pipe(gulp.dest("build/img"));
}

exports.copyImages = copyImages;

// WebP

const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
  .pipe(webp({
    quality: 90
  }))
  .pipe(gulp.dest("build/img"));
}

exports.createWebp = createWebp;

// Avif

const createAvif = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
  .pipe(avif({
    quality: 90
  }))
  .pipe(gulp.dest("build/img"));
}

exports.createAvif = createAvif;

// Sprite

const sprite = () => {
  return gulp.src([
    "source/img/**/*.svg",
    "!source/img/catalog/icon/*.svg",
    "!source/img/gift/*.svg",
    "!source/img/logo/logo-desktop.svg",
    "!source/img/logo/logo-tablet.svg",
    "!source/img/logo/logo-mobile.svg"
  ], {
    base: "source"
  })
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
}

exports.sprite = sprite;

// Copy

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
    "source/manifest.webmanifest",
    "source/img/logo/logo-desktop.svg",
    "source/img/logo/logo-tablet.svg",
    "source/img/logo/logo-mobile.svg"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
  done();
}

exports.copy = copy;

// Clean

const clean = () => {
  return del("build");
};

exports.clean = clean;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Reload

const reload = (done) => {
  sync.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/js/script.js", gulp.series(scripts));
  gulp.watch("source/*.html").on("change", sync.reload);
  // gulp.watch("source/*.html", gulp.series(html, reload));

}

// Build

const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    createWebp,
    createAvif
  )
);

exports.build = build;

// Default

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    createWebp,
    createAvif
  ),
  gulp.series(
    server,
    watcher
  )
);
