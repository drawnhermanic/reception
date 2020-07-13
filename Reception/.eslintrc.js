module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/essential",
    "eslint:recommended",
    "prettier/vue",
    "plugin:prettier/recommended"
  ],
  // required to lint *.vue files
  plugins: ["vue", "prettier"],
  // add your custom rules here
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/require-default-prop": "off",
    "vue/require-prop-types": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto"
      }
    ]
  }
}
