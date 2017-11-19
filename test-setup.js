require('babel-register')({
  extends: './.babelrc',
  plugins: [ 'transform-es2015-modules-commonjs' ],
});
