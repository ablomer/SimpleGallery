import { Media, MediaFilterInput } from "./media.model";
import { media } from "../storage";

export const mediaTypeDefs = `
  type Media {
    id: ID!
    path: String!
  }

  input MediaFilterInput {
    from: Int
    to: Int
  }
  
  type Query {
    media(filter: MediaFilterInput): [Media]
  }
`;

export const mediaResolvers = {
  Query: {
    async media(_: any, { filter = {} }) {
      const f = filter as MediaFilterInput;
      const m = media as Media[];

      if (f.from == null || f.to == null) {
        return m;
      } else {
        return m.slice(f.from, f.to);
      }
    }
  }
};
