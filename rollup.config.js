import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'

export default {
  input: 'src/smoothScroll.js',
  output: {
    file: 'dist/smoothScroll.min.js',
    format: 'umd',
    name: 'smoothScroll',
    sourcemap: true
  },
  plugins: [babel(), uglify()]
}
