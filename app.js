const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");
const app = express();
const port = 5500;

const setCustomCacheControl = (res, path) => {
    if (serveStatic.mime.lookup(path) === 'text/html') {
      res.setHeader('Cache-Control', 'public, max-age=0')
    }
  }

app.use(serveStatic(path.join(__dirname, 'public'), {
    setHeaders: setCustomCacheControl
  }));

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});