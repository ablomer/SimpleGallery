import { Media } from "./models/media.model";
import { mediaPath } from "./config";

const path = require("path");
const fs = require("fs");

const media: Media[] = [];

const validExts = ["jpg"];

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

        if (!validExts.includes(ext)) {
          return;
        }

        media.push({ path: `${album}/${file}` });
      });
    });
  });
});

export { media };
