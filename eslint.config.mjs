import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    env: {
      browser: true,
      es2021: true,
      node: true,
      jest: true,
    },
    extends: ["plugin:react/recommended", "standard"],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: ["react"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-use-before-define": "off",
    },
  },
];
