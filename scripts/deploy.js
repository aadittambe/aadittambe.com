const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();
require('dotenv').config();


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const config = {
    user: process.env.FTP_USERNAME,
    password: process.env.FTP_PASSWORD,
    host: "aadittambe.com",
    port: 21, // Your credentials

    localRoot: 'out/', // Location of build files in project
    remoteRoot: "public_html/", // Upload location on remote, replace with subfolder on FTP-server if required

    include: ["*", "**/*"], // Upload all files from build folder
    exclude: [], // Exclude no files

    deleteRemote: false, // Set to true if you want to delete ALL FILES in the remote root before uploading
    forcePasv: true // Use passive mode
};

ftpDeploy
    .deploy(config)
    .then((res) => console.log("finished:", res))
    .catch((err) => console.log(err));