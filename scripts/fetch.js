const fs = require('fs');
const archieml = require('archieml');
const request = require('request');

const CWD = process.cwd();
// const CONFIG_PATH = `${CWD}/config.json`;
// const CONFIG = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
const CONFIG = {
    "google": {
        "doc": [
            {
                "id": "1lnWLWaUz2b-ho5QxBcjh5jdxF4Gf_K2gumFWfyma4xc",
                "filepath": "data/content.json"
            },
            {
                "id": "",
                "filepath": ""
            }
        ],
        "sheet": [
            {
                "id": "",
                "gid": "",
                "filepath": ""
            }
        ]
    }
}
const { doc } = CONFIG.google;

const makeRequest = (opt, cb) => {
    const url = `https://docs.google.com/document/d/${opt.id}/export?format=txt`;
    request(url, (error, response, body) => {
        if (error) console.log(error);
        else if (response) {
            const parsed = archieml.load(body);
            const str = JSON.stringify(parsed);
            const file = `${CWD}/${opt.filepath || 'data/content.json'}`;
            fs.writeFile(file, str, err => {
                if (err) console.error(err);
                cb();
            });
        }
    });
};

function init() {
    let i = 0;
    const next = () => {
        const d = doc[i];
        if (d.id)
            makeRequest(d, () => {
                i += 1;
                if (i < doc.length) next();
                else process.exit();
            });
    };

    next();
}

init();