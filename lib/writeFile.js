const fs = require('fs');
const moment = require('moment');

const fileName = 'CHANGELOG.md';

module.exports = {
    writeFile: (res) => {
        fs.unlink(fileName, (err) => {
            if (err) return 'File may not be found. Continue...';
            // console.log('File Found, Deleting...');
        });

        var releases = JSON.parse(fs.readFileSync('sample.json', 'utf8'));

        fs.appendFile(fileName, getHeadig(), (err) => {
            if (err) return console.log(err);
            // console.log('Heading Appended!');

            for (const i in releases) {
                fs.appendFile(fileName, contentToWrite(releases[i]), (err) => {
                    if (err) return console.log(err);
                    // console.log('Body Appended!');
                });
            }

            fs.readFile(fileName, 'utf-8', (err, data) => {
                res.send(data);
            })
        });
    }
}

function getHeadig() {
    return '# Changelog\n\n';
}

function contentToWrite(release) {
    return '## ' + release.tag_name + ' (' + moment(release.published_at).format('YYYY-MM-DD') + ')\n\n' + release.body + '\n\n';
}