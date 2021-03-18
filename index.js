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

// Import html pages
const homepage = fs.readFileSync(`${__dirname}/pages/index.html`, "utf-8");
const card = fs.readFileSync(`${__dirname}/pages/card.html`, "utf-8");
const product = fs.readFileSync(`${__dirname}/pages/product.html`, "utf-8");

// METHODS
const replaceTemplate = (temp, product) => {


  let output = temp.replace(/{PRODUCT_NAME}/g,product.productName);
  output = output.replace(/{PRODUCT_DESCRIPTION}/g,product.description);
  output = output.replace(/{PRODUCT_IMG}/g,product.image);
  output = output.replace(/{PRODUCT_FROM}/g,product.from);
  output = output.replace(/{PRODUCT_NUTRIENTS}/g,product.nutrients);
  output = output.replace(/{PRODUCT_QUANTITY}/g,product.quantity);
  output = output.replace(/{PRODUCT_PRICE}/g,product.price);
  output = output.replace(/{PRODUCT_DESCRIPTION}/g,product.description);
  output = output.replace(/{PRODUCT_ID}/g,product.id);

  if(!product.organic) output = output.replace(/{NOT_ORGANIC}/g, 'not-organic');

  return output;
}
//Create server
const server = http.createServer((req, res) => {
  // Set the URL path
  const path = req.url;

  /* HOMEPAGE */
  if (path === "/" || path === "/home") {

    // Specify that we are sending back HTML to the browser.
    res.writeHead(200,{'Content-type':'text/html'});

    const cardsHtml = dataObj.map(el => replaceTemplate(card,el)).join('');
    const ouput = homepage.replace('{PRODUCT_CARDS}',cardsHtml);

    res.end(ouput);
    
  } 
  /* PRODUCT PAGE */
  else if (path === "/product") {
    res.end("This is product");
  } 
  /* API */
  else if (path === "/api") {
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
