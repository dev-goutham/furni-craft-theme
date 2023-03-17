const mix = require('laravel-mix');

mix
  .ts('src/ts/web-components/drawer.ts', 'assets/component-drawer.js')
  .ts('src/ts/web-components/icon-button.ts', 'assets/component-icon-button.js')
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
