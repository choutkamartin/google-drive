import type { NextApiRequest, NextApiResponse } from "next";
import { google, drive_v3, Auth } from "googleapis";
import fs from "fs";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const keyFilePath = "utils/credentials.json";
  const fileId = "1HvEAuCKJfcFJ68YyL2Hhbt1dpqi5OQGj";
  const destinationFileName = "filename.pdf";

  const auth: Auth.GoogleAuth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: ["https://www.googleapis.com/auth/drive"],
  });

  const drive: drive_v3.Drive = google.drive({
    version: "v3",
    auth,
  });

  const listParams: drive_v3.Params$Resource$Files$Get = {
    fileId: fileId,
    alt: "media",
  };
  drive.files.get(listParams, { responseType: "stream" }, (err, res) => {
    if (err) {
    } else {
      res.data
        .on("end", function () {
          console.log(res.data);
        })
        .on("error", function (err) {
          console.log("Error during download", err);
        })
        .pipe(fs.createWriteStream(destinationFileName));
    }
  });
  res.end();
};
