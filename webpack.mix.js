const mix = require('laravel-mix');

mix
  .ts('src/ts/main.ts', 'assets/main.js')
  .ts('src/ts/index.ts', 'assets/index.js')
  .sass('src/scss/styles.scss', 'assets/styles.css')
  .options({
    postCss: [
      require('autoprefixer')({
        browsers: ['last 40 versions'],
      }),
      require('cssnano'),
    ],
    uglify: {},
  });
