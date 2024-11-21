const { desktopCapturer } = require("electron");

async function getScreenStream() {
  const sources = await desktopCapturer.getSources({ types: ["screen"] });

  for (const source of sources) {
    if (source.name === "Entire Screen") {
      return source.id;
    }
  }
}

module.exports = { getScreenStream };
