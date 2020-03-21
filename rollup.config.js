import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: '.tmp/index.js',
      format: 'cjs',
    },
    {
      file: '.tmp/index.es.js',
      format: 'es',
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],plugins: [
    typescript({
      typescript: require('typescript'),
    }),
  ],
}
