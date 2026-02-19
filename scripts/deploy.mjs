import "dotenv/config";
import FtpDeploy from "ftp-deploy";

const required = ["FTP_USERNAME", "FTP_PASSWORD", "FTP_HOST"];
for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required env var: ${key}`);
  }
}

const ftpDeploy = new FtpDeploy();

const config = {
  user: process.env.FTP_USERNAME,
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_HOST,
  port: 22, // Your credentials

  localRoot: "out/", // Location of build files in project
  remoteRoot: "public_html/", // Upload location on remote, replace with subfolder on FTP-server if required

  include: ["*", "**/*"], // Upload all files from build folder
  exclude: [], // Exclude no files

  deleteRemote: true, // Set to true if you want to delete ALL FILES in the remote root before uploading
  forcePasv: true, // Use passive mode
  sftp: true,
};

try {
  const res = await ftpDeploy.deploy(config);
  console.log("finished:", res);
} catch (err) {
  console.error("deploy failed:", err);
  process.exitCode = 1;
}
