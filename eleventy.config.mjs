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

  eleventyConfig.addGlobalData("domain", domain);

  eleventyConfig.addWatchTarget("./src/**/*");

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
    }
  };
}
