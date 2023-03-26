const mix = require('laravel-mix');

mix
  .ts('src/ts/pages/product.js', 'assets/product.js')
  .ts('src/ts/web-components/drawer.ts', 'assets/component-drawer.js')
  .ts('src/ts/web-components/icon-button.ts', 'assets/component-icon-button.js')
  .ts(
    'src/ts/web-components/currency-selector.ts',
    'assets/component-currency-selector.js',
  )
  .ts('src/ts/web-components/variant.ts', 'assets/component-variant.js')
  .ts('src/ts/web-components/cart.ts', 'assets/component-cart.js')
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
