//@ts-check
const domain = "https://template.webstandards.ca.gov";

/**
 *
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 * @returns
 */
export default async function (eleventyConfig) {
  // Copy `src/css/` to `_site/css`, `src/images/` to `_site/images`
  // Copy all static files that should appear in the website root
  // Copy state template code files from NPM
  eleventyConfig.addPassthroughCopy({
    "src/images": "images",
    "src/css": "css",
    "src/root": "/",
    "node_modules/@cagovweb/state-template/dist": "state-template"
  });

  eleventyConfig.addFilter(
    "canonical",
    (/** @type {{url:string}} */ page) => domain + page.url
  );

  // allow nunjucks templating in .html files
  eleventyConfig.setTemplateFormats(["html", "njk", "11ty.js", "md"]);

  eleventyConfig.addGlobalData("domain", domain);

  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addWatchTarget("./src/images/");

  eleventyConfig.setServerOptions({
    watch: ["_site/**/*"]
  });

  eleventyConfig.addPassthroughCopy("src/_data");

  return {
    // allow nunjucks templating in .html files
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "njk", "11ty.js", "md"],
    dir: {
      // site content pages
      input: "pages",
      includes: "_includes",
      output: "_site"
    },
    // Exclude _includes folder from being processed
    passthroughFileCopy: true,
    pathPrefix: "/",
    dataTemplateEngine: false
  };
}
