const express = require('express');
const app = express();
const serveStatic = require('serve-static');
const path = require('path');
const moment = require('moment');
var fs = require('fs');

const fileName = 'CHANGELOG.md';

/**
 * serves index page
 */
app.use(serveStatic(path.join(__dirname, 'src'), {
    'index': ['index.html', 'index.html']
}))

/**
 * generates changelog from the request
 */
app.get('/generate-changelog', (req, res, next) => {

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

})

function getHeadig() {
    return '# Changelog\n\n';
}

function contentToWrite(release) {
    return '## ' + release.tag_name + ' (' + moment(release.published_at).format('YYYY-MM-DD') + ')\n\n' + release.body + '\n\n';
}

app.listen(3000, () => console.log('Example app listening on port 3000!'))