const express = require('express');
const app = express();
const serveStatic = require('serve-static');
const path = require('path');

app.use(serveStatic(path.join(__dirname, 'src'), {
    'index': ['index.html', 'index.html']
}))

app.get('/generate-changelog', (req, res, next) => {
    console.log(req);
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))