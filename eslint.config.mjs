import globals from "globals";
import pluginJs from "@eslint/js";
import prettier from "eslint-config-prettier";
import babelParser from "@babel/eslint-parser"; // Importa el parser de Babel

export default [
  {
    languageOptions: {
      parser: babelParser, // Usa el parser de Babel
      parserOptions: {
        requireConfigFile: true, // Ahora se usa el archivo .babelrc
        ecmaVersion: 2020,
        sourceType: "module",
      },
      globals: {
        ...globals.es2021,
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      "no-console": "warn",
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    },
  },
  pluginJs.configs.recommended, // Usa la configuración recomendada de ESLint
  prettier, // Extiende con Prettier para manejar el formateo
];
