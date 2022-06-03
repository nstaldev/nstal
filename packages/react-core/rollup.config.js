import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";

import packageJson from "./package.json";

const config = [
  {
    input: "./src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        name: "react-core"
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true
      }),
      commonjs(),
      typescript({ useTsconfigDeclarationDir: true }),
      json()
    ]
  }
];

export default config;
