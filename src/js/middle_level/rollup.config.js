import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/js/middle_level/glboost_include.js',
  dest: 'build/glboost.js',
  format: 'umd',
  moduleName: 'GLBoost',

  plugins: [
    // refs: https://github.com/rollup/rollup/issues/357#issuecomment-180447881
    babel({
      babelrc: false,
      presets: ['es2015-rollup'],
      exclude: 'node_modules/**'
    })
  ]
}