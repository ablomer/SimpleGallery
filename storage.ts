import { Media } from "./models/media.model";
import { mediaPath } from "./config";
import { db } from "./database";

const path = require("path");
const fs = require("fs");

const validExts = ["jpg"];

const media: Media[] = [];

async function loadMedia() {
  for (let album of fs.readdirSync(mediaPath)) {
    const albumDir = path.join(mediaPath, album);

    if (!fs.lstatSync(albumDir).isDirectory()) {
      continue;
    }

    const tags: string[] = await new Promise(function(resolve, reject) {
      db.all(`SELECT tag FROM albumTags WHERE album == ?`, [album], function(error: any, rows: any[]) {
        if (error) {
          reject(error);
        } else {
          const tags: string[] = [];
          for (let row of rows) {
            tags.push(row.tag);
          }
          resolve(tags);
        }
      });
    });

    for (let file of fs.readdirSync(albumDir)) {
      const ext = file.split(".").pop();
      const path = `${album}/${file}`;

      if (!validExts.includes(ext)) {
        continue;
      }

      media.push({ path: escape(path), album: { name: album, tags } });
    }
  }

  media.sort(function(a, b) {
    return a.path.localeCompare(b.path);
  });

  return media.length;
}

loadMedia()
  .then(function(mediaLength) {
    console.log(`Loaded ${mediaLength} files`);
  })
  .catch(function(error) {
    console.error(error);
  });

// TODO: Generate thumbs

export { media };
