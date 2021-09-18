import type { NextApiRequest, NextApiResponse } from "next";
import {
  google, // The top level object used to access services
  drive_v3, // For every service client, there is an exported namespace
  Auth, // Namespace for auth related types
  Common, // General types used throughout the library
} from "googleapis";
import fs from "fs";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Note: using explicit types like `Auth.GoogleAuth` are only here for
  // demonstration purposes.  Generally with TypeScript, these types would
  // be inferred.
  const file = req.query.id[0];
  const auth: Auth.GoogleAuth = new google.auth.GoogleAuth({
    // Scopes can be specified either as an array or as a single, space-delimited string.
    keyFile: "lib/credentials.json",
    scopes: ["https://www.googleapis.com/auth/drive"],
  });
  const drive: drive_v3.Drive = google.drive({
    version: "v3",
    auth,
  });

  // There are generated types for every set of request parameters
  const listParams: drive_v3.Params$Resource$Files$Get = {
    fileId: "1HvEAuCKJfcFJ68YyL2Hhbt1dpqi5OQGj",
    alt: "media",
  };
  const test = drive.files.get(
    listParams,
    { responseType: "stream" },
    (err, res) => {
      if (err) {
      } else {
        res.data
          .on("end", function () {
            console.log(res.data);
          })
          .on("error", function (err) {
            console.log("Error during download", err);
          })
          .pipe(fs.createWriteStream("test.jpg"));
      }
    }
  );
  res.end();
};
