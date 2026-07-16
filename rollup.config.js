import esbuild from "rollup-plugin-esbuild";

const onwarn = function (warning) {
  // should intercept warnings but doesn't in some rollup versions
  if (warning.code === "THIS_IS_UNDEFINED") {
    return;
  }

  // console.warn everything else
  console.warn(warning.message);
};

export default [
  {
    input: "src/js/custom.js",
    output: {
      file: "_site/js/custom.js",
      format: "esm"
    },
    onwarn
  },
  {
    input: "src/js/custom.js",
    output: {
      file: "_site/js/custom.min.js",
      format: "esm"
    },
    plugins: [esbuild({ minify: true })],
    onwarn
  }
];
