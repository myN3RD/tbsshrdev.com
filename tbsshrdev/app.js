//const http = require("http"); // FOR LOCAL DEVELOPMENT ONLY
const https = require("https");
const express = require('express');
const fs = require("fs");
const path = require("path");
const helmet = require('helmet');


const options = {
  key: fs.readFileSync('key.pem'),	
//  key: fs.readFileSync(`${__dirname}/key.pem`),
  cert: fs.readFileSync('cert.crt'),
//  cert: fs.readFileSync(`${__dirname}/cert.crt`),
  ca: [fs.readFileSync('bundle.crt')]
//  ca: [fs.readFileSync(`${__dirname}/bundle.crt`)]
};


const app = express();
app.use(helmet());

app.use(express.static('public'));
app.use(express.static('views'));
app.use("/car-website", express.static("car-website"));
app.use("/find-stay-website", express.static("find-stay-website"));
app.use("/yacht-rent-website", express.static("yacht-rent-website"));
app.use(express.static(path.join(__dirname, "images")));
app.use("/images", express.static("images")); // FOR THE PORTFOLIO IMAGES

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./", "views", "index.html"));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./", "public", "css", "style.css"));
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./", "css", "style.css"));
});

app.get("/", function (req, res) {
 res.sendFile(path.join(__dirname, "./", "car-website", "index.html"));
});

app.get("/", function (req, res) {
 res.sendFile(path.join(__dirname, "./", "find-stay-website", "index.html"));
});

app.get("/", function (req, res) {
 res.sendFile(path.join(__dirname, "./", "yacht-rent-website", "index.html"));
});

////// HTTP SERVER *** working -> port 80
//const server = http.createServer(app);
//  server.listen(80);
//  console.log(`HTTP server is running at port:${80}`);

////// HTTPS SERVER -> port 443
//https.createServer(options, app).listen(443, () => {
//  console.log("server is running on port 443");
//});

////// HTTPS SERVER ALTERNATIVE
const port = 443;
const server = https.createServer(options, app);
  server.listen(port);
  console.log(`Alternative https server is running on port:${port}`);


//app.get('/', (req, res) => {
//	if (req.headers['x-forwarded-proto'] !== 'https' {
//		return res.redirect('https://' + req.headers.host + req.url);
//	}
//	res.sendFile(path.join(__dirname, 'views/index.html'));	
//});
