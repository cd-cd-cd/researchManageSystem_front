module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "plugin:react/recommended",
    "standard-with-typescript"
  ],
  "overrides": [
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/consistent-type-assertions": "off"
  },
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": ['./tsconfig.json'],
    "tsconfigRootDir": __dirname
  },
}
