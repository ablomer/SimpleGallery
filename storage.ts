import { Media } from "./models/media.model";
import { mediaPath } from "./config";

const path = require("path");
const fs = require("fs");

const validExts = ["jpg"];

const media: Media[] = [];

fs.readdir(mediaPath, function(err: any, files: any) {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  files.forEach(function(album: any) {
    const albumDir = path.join(mediaPath, album);

    if (!fs.lstatSync(albumDir).isDirectory()) {
      return;
    }

    fs.readdir(albumDir, function(err: any, files: any) {
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }

      files.forEach(function(file: any) {
        const ext = file.split(".").pop();
        const path = `${album}/${file}`;

        if (!validExts.includes(ext)) {
          return;
        }

        media.push({ path: escape(path) });
      });
    });
  });
});

export { media };
