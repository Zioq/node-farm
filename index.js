// Create a simple web server & API
/* 
API: API stands for Application Programming Interface.
WEB API: A service from which we can request some data(In this case, the data that users wants to request is data about the products that we are offering in this node_farm)
*/
const fs = require("fs");
const http = require("http");
const url = require("url");

// Import json data
const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

//Create server
const server = http.createServer((req, res) => {
  // Set the URL path
  const path = req.url;

  if (path === "/" || path === "/home") {
    res.end("This is home");
  } else if (path === "/product") {
    res.end("This is product");
  } else if (path === "/api") {
    if (data) {
      // Specify that we are sending back JSON to the browser.
      res.writeHead(200, {
        "Content-type": "application/json",
      });
      // This res.method actually needs to send back a string, not an object
      res.end(data);
    }
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end(`<h1>Page not found</h1>`);
  }
});

//Listen incoming requests from server
const port = 8000;
server.listen(port, () => {
  console.log(`Listening to request on port ${port}`);
});
