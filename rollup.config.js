import {terser} from "rollup-plugin-terser";
import * as meta from "./package.json";

const config = {
  input: "index.js",
  external: Object.keys(meta.dependencies),
  output: {
    file: `build/${meta.name}.js`,
    name: "d3",
    format: "umd",
    extend: true,
    banner: `// ${meta.homepage} Version ${meta.version} Copyright ${(new Date).getFullYear()} ${meta.author.name}.`,
    globals: Object.assign({}, ...Object.keys(meta.dependencies).map(key => ({[key]: "d3"})))
  },
  plugins: []
};

export default [
  config,
  {
    ...config,
    output: {
      ...config.output,
      file: `build/${meta.name}.min.js`
    },
    plugins: [
      ...config.plugins,
      terser({
        output: {
          preamble: config.output.banner
        }
      })
    ]
  }
];
