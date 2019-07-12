import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'
import pkg from './package.json'

export default [
  {
    input: './src/index.js',
    output: [
      {
        file: pkg.main,
        format: 'umd',
        name: 'smoothScroll',
      },
      {
        file: pkg.module,
        format: 'es',
        name: 'smoothScroll',
      },
    ],
    plugins: [resolve(), commonjs(), babel()],
  },
  {
    input: './src/index.js',
    output: [
      {
        file: 'dist/smooth-scroll.min.js',
        format: 'umd',
        name: 'smoothScroll',
        sourceMap: true,
      },
    ],
    plugins: [resolve(), commonjs(), babel(), uglify()],
  },
]
