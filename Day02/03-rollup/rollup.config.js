import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default{
    input: "./src/index.js",
    output: [
        {
            file: "dist/index.bundle.esm.js",
            format: "esm",
            plugins: [terser()]
        },
        {
            file: "dist/index.bundle.cjs.js",
            format: "cjs"
        },
    ],
    plugins: [json(), resolve(), commonjs()],
    external: ["vue"]
}
