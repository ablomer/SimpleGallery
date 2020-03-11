import { Media } from "./models/media.model";
import { mediaPath } from "./config";

const path = require("path");
const fs = require("fs");

const validExts = ["jpg"];

const media: Media[] = [];

fs.readdirSync(mediaPath).forEach(function(album: any) {
  const albumDir = path.join(mediaPath, album);

  if (!fs.lstatSync(albumDir).isDirectory()) {
    return;
  }

  fs.readdirSync(albumDir).forEach(function(file: any) {
    const ext = file.split(".").pop();
    const path = `${album}/${file}`;

    if (!validExts.includes(ext)) {
      return;
    }

    media.push({ path: escape(path), album });
  });
});

media.sort(function(a, b) {
  return a.path.localeCompare(b.path);
});

console.log(`Loaded ${media.length} files`);

// TODO: Generate thumbs

export { media };
