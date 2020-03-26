import { db } from "../database";

export const albumTypeDefs = `
  type Album {
    id: ID
    name: String
    tags: [String]
  }
  
  extend type Mutation {
    assignTag(album: String, tag: String): String
    unassignTag(album: String, tag: String): String
  }
`;

export const albumResolvers = {
  Query: {
    // tags(_: any, {}) {
    //   const promise = new Promise(function(resolve, reject) {
    //     db.all(`SELECT * FROM tags`, [], function(error: any, rows: any) {
    //       if (error) {
    //         reject(error);
    //       } else {
    //         resolve(rows);
    //       }
    //     });
    //   });
    //   return promise;
    // },
  },

  Mutation: {
    assignTag(_: any, { album = "", tag = "" }) {
      return new Promise(function(resolve, reject) {
        db.run(`INSERT OR IGNORE INTO "albumTags" ("album", "tag") VALUES (?, ?)`, [album, tag], function(error: any) {
          if (error) {
            reject(error);
          } else {
            resolve("success");
          }
        });
      });
    },

    unassignTag(_: any, { album = "", tag = "" }) {
      return new Promise(function(resolve, reject) {
        db.run(`DELETE FROM "albumTags" WHERE album = ? AND tag = ?`, [album, tag], function(error: any) {
          if (error) {
            reject(error);
          } else {
            resolve("success");
          }
        });
      });
    }
  }
};
