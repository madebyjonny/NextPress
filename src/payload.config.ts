// storage-adapter-import-placeholder
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Posts } from "./collections/Posts";
import { Pages } from "./collections/Pages";
import { s3Storage } from "@payloadcms/storage-s3";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  plugins: [],
  // process.env.NODE_ENV === "production"
  //   ? [
  //       s3Storage({
  //         collections: {
  //           ["media"]: true,
  //         },
  //         bucket: process.env.S3_BUCKET as string,
  //         config: {
  //           forcePathStyle: true,
  //           endpoint: process.env.S3_ENDPOINT as string,
  //           credentials: {
  //             accessKeyId: process.env.S3_ACCESS_ID as string,
  //             secretAccessKey: process.env.S3_SECRET_ID as string,
  //           },
  //           region: process.env.S3_REGION as string,
  //         },
  //       }),
  //     ]
  //   : [],
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Posts, Pages],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI as string,
      authToken: process.env.AUTH_TOKEN as string,
    },
  }),
});
