const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://payments-786-dot-sevenrooms-secure-qa.appspot.com/",
  },
});
