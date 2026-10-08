import { transform } from "lightningcss";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("main.css");
  eleventyConfig.addPassthroughCopy("img");

  eleventyConfig.addFilter("cssmin", function (inputCode) {
    if (process.env.ELEVENTY_RUN_MODE === "build") {
      let { code } = transform({
        // filename: undefined,
        code: Buffer.from(inputCode),
        minify: true,
        sourceMap: false,
      });
      return code;
    }

    return `/* [buildawesome] cssmin skipped during --watch and --serve */\n${inputCode}`;
  });

  // Universal shortcodes
  eleventyConfig.addShortcode("formatDate", function (d) {
    // Create a date object from d
    const date = new Date(d);

    // Create a list of names for the months
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // return a formatted date
    return (
      months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
    );
  });

  return {
    dir: {
      input: "", // Eleventy looks here for your files!
      output: "_site",
    },
  };
}
