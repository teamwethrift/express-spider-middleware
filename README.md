# express-spider-middleware

An ExpressJS middleware for detecting search engine crawlers and spiders, with the option of including a callback to perform additional search engine-specific logic such as logging or monitoring.

This module is a fork of Michael Heuberger's [spider-detector](https://github.com/binarykitchen/spider-detector). We use this module at [Wethrift.com](https://www.wethrift.com) to handle additional logging and monitoring of search engine crawlers.

## Install

```
npm install express-spider-middleware
```

## User-agent string detector

Detect whether any user-agent string matches a known crawler or bot.

```js
var detector = require('spider-detector')
detector.isSpider('baiduspider') // return true
```

## ExpressJS middleware - Detecting crawlers

Use as an ExpressJS middleware to attach an `isSpider` property to every request.

```js
var expressSpiderMiddleware = require('express-spider-middleware'),
    express  = require('express'),
    app      = express()

app.use(expressSpiderMiddleware.middleware())

app.get('/*', function(req, res) {
    if (req.isSpider()) {
        // handle request from search engine crawler
    } else {
        // handle all other requests
    }
})
```

## Using a callback to handle additional logic for all requests

The `.middleware()` method accepts an optional callback function that will execute for all routes when a crawler is detected.

```js
app.use(expressSpiderMiddleware.middleware(function(req){
  console.log('Crawler detected:', req.get('user-agent'))
}))
```
