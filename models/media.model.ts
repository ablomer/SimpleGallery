import { Album } from "./album.model";

type Media = {
  path: string;
  album: Album;
};

type MediaFilterInput = {
  from: number;
  to: number;
};

export { Media, MediaFilterInput };
