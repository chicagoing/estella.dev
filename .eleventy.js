const cleanCSS = require("clean-css");
const htmlMin = require("html-minifier");
const fs = require('fs');

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("cssmin", function(code) {
    return new cleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addPassthroughCopy("src/img");

  eleventyConfig.addTransform("htmlMin", function(content, outputPath) {
    if(outputPath.endsWith(".html")) {
      let minified = htmlMin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });

  return {
    dir: {
      input: 'src'
    }
  };
};