module.exports = {
  root: true,
  env: {
    es2020: true,
    node: true,
    jest: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier"
  ],
  rules: {
    "import/order": [
      "warn",
      {
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true }
      }
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }]
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts"]
      }
    }
  }
};
