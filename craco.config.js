const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/")
    }
  },
  jest: {
    configure: {
      modulePaths: "<rootDir>/node_modules/",
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
      }
    }
  }
};
