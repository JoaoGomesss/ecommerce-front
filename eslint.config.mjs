import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import tsParser from "@typescript-eslint/parser";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: tsParser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      project: "./tsconfig.json",
    },
  },
  {
    plugins: {
      "@typescript-eslint": tseslint,
    },
  },
  {
    rules: {
      ...tseslint.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
  },
];
