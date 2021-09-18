import type { NextApiRequest, NextApiResponse } from "next";
import { google, drive_v3, Auth } from "googleapis";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const keyFilePath = "utils/credentials.json";

  const auth: Auth.GoogleAuth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: ["https://www.googleapis.com/auth/drive"],
  });
  const drive: drive_v3.Drive = google.drive({
    version: "v3",
    auth,
  });

  const listParams: drive_v3.Params$Resource$Files$List = {};
  const response = await drive.files.list(listParams);

  const listResults: drive_v3.Schema$FileList = response.data;
  res.json(listResults);
};
