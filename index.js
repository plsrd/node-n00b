const fs = require('fs')
const path = require('path')
const http = require('http')

const PORT = process.env.PORT ||8080

const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    'public',
    res.url == '/' ? 'index.html' : req.url
  )

  console.log('filePath:', filePath)

  let extname = path.extname(filePath)

  let contentType

  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  fs.readFile(filePath, (err, content) => {

    if(err) {
      if(err.code == 'ENOENT') {
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.end(content, 'utf8')
        })
      } else {
        res.writeHead(500)
        res.end(`Server error: ${err.code}`)
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(content, 'utf8')
    }
  })

})


server.listen(8080, () => console.log(`Server running at port ${PORT}`) )