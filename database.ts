import { databasePath } from "./config";

const sqlite3 = require("sqlite3");

let db = new sqlite3.Database(databasePath, function(error: any) {
  if (error) {
    console.error(error.message);
  } else {
    console.log("Connected to the database");
  }
});

db.run(`
CREATE TABLE IF NOT EXISTS albumTags (
    album TEXT,
    tag TEXT,
    PRIMARY KEY (album, tag)
)`);

export { db };
