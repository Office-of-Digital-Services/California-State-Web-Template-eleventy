//@ts-check

const domain = "https://template.webstandards.ca.gov";

/**
 * Configures Eleventy with the specified settings.
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig - The Eleventy configuration object.
 * @returns {Promise<import("@11ty/eleventy").UserConfig>} The configured Eleventy object.
 */
module.exports = async function (eleventyConfig) {
  const { EleventyRenderPlugin } = await import("@11ty/eleventy");

  // Copy `src/css/` to `_site/css`, `src/images/` to `_site/images`
  // Copy all static files that should appear in the website root
  // Copy state template code files from NPM
  eleventyConfig.addPassthroughCopy({
    "src/images": "images",
    "src/css": "css",
    "src/root": "/",
    "node_modules/@cagovweb/state-template/dist": "state-template"
  });

  // Sorted list of all the samples
  eleventyConfig.addFilter(
    "canonical",
    (/** @type {{url:string}} */ page) => domain + page.url
  );

  // allow nunjucks templating in .html files
  eleventyConfig.setTemplateFormats(["html", "njk", "11ty.js", "md"]);
  const nunjucks = require("nunjucks");
  const njkEnv = new nunjucks.Environment();
  njkEnv.addFilter(
    "canonical",
    (/** @type {{url:string}} */ page) => domain + page.url
  );
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addGlobalData("domain", domain);

  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addWatchTarget("./src/images/");

  eleventyConfig.setBrowserSyncConfig({
    files: ["_site/**/*"]
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
};
