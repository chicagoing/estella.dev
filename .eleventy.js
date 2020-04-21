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

  // Universal shortcodes
  eleventyConfig.addShortcode("formatDate", function(d) {
    // Create a date object from d
    const date = new Date(d);

    // Create a list of names for the months
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',	'November', 'December'];

    // return a formatted date
    return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
  });

  return {
    dir: {
      input: 'src'
    }
  };
};