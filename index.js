const express = require('express');
const app = express();
const serveStatic = require('serve-static');
const path = require('path');
const PORT = process.env.PORT || 5000;

/**
 * imports
 */
const writeFile = require('./lib/writeFile');

/**
 * serves home page
 */
app.use(serveStatic(path.join(__dirname, 'src'), {
    'index': ['index.html', 'index.html']
}))

/**
 * generates changelog from the request
 */
app.get('/generate-changelog', (req, res, next) => {

    writeFile.writeFile(res);

})


app.listen(PORT, () => console.log('Example app listening on port ' + PORT + '!'))