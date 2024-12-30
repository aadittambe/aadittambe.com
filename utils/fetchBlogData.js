const request = require("request");
const fs = require("fs");

const fetchBlogData = async (config) => {
  for (let i = 0; i < config.length; i++) {
    const url = `https://docs.google.com/document/d/${config[i].id}/export?format=md`;
    request(url, (error, response, body) => {
      const removeSlashes = body.replace(/\\/g, "");

      if (error) console.log(error);
      else if (response) {
        const dataPath = `./blog/${config[i].slug}.md`;

        fs.writeFile(dataPath, removeSlashes, (err) => {
          if (err) console.error(err);
        });
      }
    });
  }
};

export default fetchBlogData;
